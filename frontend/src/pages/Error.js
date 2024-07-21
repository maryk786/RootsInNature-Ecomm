import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="error-page display-1 fw-bold">404</h1>
          <p className="fs-3">
            <span>Opps!</span> Page not found.
          </p>
          <p className="lead mt-2 mb-4">
            The page you're looking for doesn't exist.
          </p>
          <div className="flex justify-evenly text-sm">
            <Link to={"/"}>
              <div>
                <button
                  type="submit"
                  className="my-4 p-2 rounded-md bg-[#144402] text-white hover:no-underline"
                >
                  Back to Home
                </button>
              </div>
            </Link>
            <Link to={"/contact"}>
              <div>
                <button
                  type="submit"
                  className="my-4 p-2 rounded-md bg-[#144402] text-white hover:no-underline"
                >
                  Report Problem
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ErrorPage
