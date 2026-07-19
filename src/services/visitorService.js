import { getApiBaseUrl } from '../lib/site';

/**
 * Visitor Tracking Service
 *
 * Provides methods for registering and tracking visitor sessions.
 * Allows easy modification of headers, payloads, and endpoints.
 */

const API_BASE_URL = getApiBaseUrl();
const VISITOR_STORE_URL = `${API_BASE_URL}/api/visitors/store/`;

/**
 * Tracks the visitor by sending a POST request to the store endpoint.
 * 
 * @param {AbortSignal} [signal] - Optional AbortSignal to cancel the request if needed.
 * @returns {Promise<any>} Response data from the API.
 */
export const trackVisitor = async (signal) => {
  // Flexible header structure to easily add authorization, custom identifiers, etc. in the future.
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    // Add any future headers here
  };

  try {
    const response = await fetch(VISITOR_STORE_URL, {
      method: "POST",
      headers: headers,
      // Sending an empty body as this endpoint acts as a register/heartbeat signal.
      body: JSON.stringify({}),
      signal: signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // If the error was due to an intentional abort, ignore it or handle accordingly
    if (error.name === "AbortError") {
      console.log("Visitor tracking request was aborted.");
      return null;
    }
    
    // Rethrow other errors to be logged by the caller
    throw error;
  }
};
