/**
 * Simple slugification helper for standard Latin and non-Latin characters (including Arabic).
 * 
 * @param {string} text Raw text to slugify
 * @returns {string} Clean URL-friendly slug
 */
export function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\u0621-\u064A\u00C0-\u017F\-]+/g, '') // Keep alphanumeric, Arabic, European accented characters, and hyphens
    .replace(/\-\-+/g, '-') // Replace multiple hyphens with a single one
    .replace(/^-+/, '') // Trim hyphens from the start
    .replace(/-+$/, ''); // Trim hyphens from the end
}

/**
 * Classifies a CSV row dynamically into 'blog' or 'faq' based on content structure and title keywords.
 * 
 * @param {Record<string, string>} row Parsed CSV row object
 * @returns {'blog' | 'faq'} Content type classification
 */
export function classifyRow(row) {
  const name = (row['name'] || '').toLowerCase();
  const struct = (row['content structurs'] || '').toLowerCase();
  
  // Keywords indicating procedural terms, definitions, documents or timings
  const faqKeywords = [
    'conossement', 'aangifte', 'certificaat', 'nummer', 'documenten', 
    'tijd', 'proces', 'procedure', 'bill of lading', 'document', 
    'ens-aangifte', 'mrn-nummer', 'tijdelijke invoerprocedure'
  ];
  
  const hasFaqKeyword = faqKeywords.some(kw => name.includes(kw));
  
  // If it has FAQ keywords, a question mark, or very short content structure outline, classify as FAQ
  if (hasFaqKeyword || struct.length < 45 || name.includes('?')) {
    return 'faq';
  }
  
  return 'blog';
}

/**
 * RFC 4180 compliant CSV Parser.
 * Handles quotes, commas inside quotes, escaped quotes, newlines, UTF-8, and empty values.
 * 
 * @param {string} text The raw CSV text content
 * @returns {{headers: string[], data: Record<string, string>[]}} Parsed headers and data object arrays
 */
export function parseCSV(text) {
  if (!text || text.trim() === '') {
    throw new Error('CSV file is empty');
  }

  const result = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          cell += '"';
          i++; // Skip the next double quote
        } else {
          inQuotes = false;
        }
      } else {
        cell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(cell.trim());
        cell = '';
      } else if (char === '\r' || char === '\n') {
        row.push(cell.trim());
        cell = '';
        // Only push row if it contains at least one non-empty value
        if (row.some(val => val !== '')) {
          result.push(row);
        }
        row = [];
        // Skip next character if it is a CRLF combination
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
      } else {
        cell += char;
      }
    }
  }

  // Handle final cell / row
  if (cell || inQuotes) {
    row.push(cell.trim());
  }
  if (row.length > 0 && row.some(val => val !== '')) {
    result.push(row);
  }

  if (result.length === 0) {
    throw new Error('CSV contains no valid tabular data');
  }

  const headers = result[0].map(h => h.trim().toLowerCase());
  if (headers.length === 0 || headers.every(h => h === '')) {
    throw new Error('CSV has no valid headers');
  }

  const slugCounts = {};
  const data = result.slice(1).map((rowValues, rowIndex) => {
    const rowObj = {};
    headers.forEach((header, colIndex) => {
      const val = rowValues[colIndex] !== undefined ? rowValues[colIndex] : '';
      if (header) {
        rowObj[header] = val;
      } else {
        rowObj[`column_${colIndex}`] = val;
      }
    });

    const nameVal = rowObj['name'] || rowObj['column_0'] || '';
    let baseSlug = slugify(nameVal);
    if (!baseSlug) {
      baseSlug = `resource-${rowIndex}`;
    }

    let uniqueSlug = baseSlug;
    if (slugCounts[baseSlug] !== undefined) {
      slugCounts[baseSlug]++;
      uniqueSlug = `${baseSlug}-${slugCounts[baseSlug]}`;
    } else {
      slugCounts[baseSlug] = 0;
    }

    rowObj.slug = uniqueSlug;
    rowObj.type = classifyRow(rowObj);
    return rowObj;
  });

  return { headers, data };
}

/**
 * Fetches CSV file from a URL/path and parses it.
 * 
 * @param {string} url The path to fetch the CSV file from (e.g. '/data.csv')
 * @param {AbortSignal} [signal] Optional abort signal for canceling requests
 * @returns {Promise<{headers: string[], data: Record<string, string>[]}>}
 */
export async function fetchAndParseCSV(url, signal) {
  try {
    const response = await fetch(url, { signal });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`CSV file not found (404) at ${url}`);
      }
      throw new Error(`Failed to fetch CSV: Server returned status ${response.status} (${response.statusText})`);
    }

    const text = await response.text();
    return parseCSV(text);
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error; // Re-throw AbortError so hooks can ignore it if intended
    }
    console.error('Error fetching or parsing CSV data:', error);
    throw error;
  }
}
