import type { ValidateResponse } from "../types";
import { API_ENDPOINT } from "../utils/constants";

/**
 * Validates a word guess against the Wordle API
 * @param guess - The 5-letter word to validate
 * @returns Promise with validation result and score
 */
export async function validateGuess(guess: string): Promise<ValidateResponse>{
    try{
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({guess: guess.toLowerCase()}),
        });

        if(!response.ok){
            throw new Error(`API error: ${response.status}`);
        }

        const data: ValidateResponse = await response.json();
        return data;
    }catch(error){
        console.error('Error validating guess: ', error);
        throw error;
    }
}