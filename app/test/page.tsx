'use client'
import React, { useState } from 'react'

const TestPage = () => {

const message = 'got you'
    const [isLoading, setIsLoading] = useState(false); // Add a loading state

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when submitting the form
    try {
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      // Clear the fields except for the car type field
      if (response.ok) {
        console.log("Data sent successfully!");
        console.log(message)
        // Clear the fields except for the car type field
      } else {
        console.error("Failed to send data");
        // Handle failure
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    } finally {
      setIsLoading(false); // Reset loading state after API call completes
    }
  }
  return (
    <div> 
        <form onSubmit={handleSubmit} >
          <button
            type="submit"

          >
            submit
          </button>
        </form>
    </div>
  )
}

export default TestPage