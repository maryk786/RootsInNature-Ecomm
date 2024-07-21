import React from "react";
import { Link } from "react-router-dom";
import BreadCrum from "../components/BreadCrum";

const TermsAndConditions = () => {
  return (
    <>
      <BreadCrum title="Term & Conditions" name="Our Conditions" />

      <div className="container">
        <div className="row justify-center my-10">
          <div className="col-7">
            <div className="text-lg">
              <p className="mb-4">
                Welcome to our website. If you continue to browse and use this
                website, you are agreeing to comply with and be bound by the
                following terms and conditions of use.
              </p>
              <p className="mb-4">
                The use of this website is subject to the following terms of
                use:
              </p>
              <ol className="list-decimal ml-8 mb-4">
                <li>
                  The content of the pages of this website is for your general
                  information and use only. It is subject to change without
                  notice.
                </li>
                <li>
                  This website uses cookies to monitor browsing preferences. If
                  you do allow cookies to be used, the following personal
                  information may be stored by us for use by third parties.
                </li>
                <li>
                  Neither we nor any third parties provide any warranty or
                  guarantee as to the accuracy, timeliness, performance,
                  completeness, or suitability of the information and materials
                  found or offered on this website for any particular purpose.
                  You acknowledge that such information and materials may
                  contain inaccuracies or errors, and we expressly exclude
                  liability for any such inaccuracies or errors to the fullest
                  extent permitted by law.
                </li>
                <li>
                  Your use of any information or materials on this website is
                  entirely at your own risk, for which we shall not be liable.
                  It shall be your own responsibility to ensure that any
                  products, services, or information available through this
                  website meet your specific requirements.
                </li>
              </ol>
              <p className="mb-4">
                All trade marks reproduced in this website which are not the
                property of, or licensed to, the operator are acknowledged on
                the website.
              </p>
              <p className="mb-4">
                Unauthorized use of this website may give rise to a claim for
                damages and/or be a criminal offence.
              </p>
              <p className="mb-4">
                From time to time, this website may also include links to other
                websites. These links are provided for your convenience to
                provide further information. They do not signify that we endorse
                the website(s). We have no responsibility for the content of the
                linked website(s).
              </p>
              <p className="mb-4">
                Your use of this website and any dispute arising out of such use
                of the website is subject to the laws of the United States of
                America.
              </p>
              <p className="mt-8">
                If you have any questions about our terms and conditions, please{" "}
                <Link to="/contact" className="text-blue-500 hover:underline">
                  contact us
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;
