"use client";

import DOMPurify from "dompurify";
import Link from "next/link";
import React from "react";
import * as FontAwesome from "react-icons/fa";
import { useRouter } from "next/navigation";
import { sanitizeLink } from "@/utils/sanitizeLink";

const ContactInformation = ({ data, spaceBefore, spaceAfter }) => {
  const router = useRouter();

  let contact = data?.contactNumber ? data.contactNumber.replace("tel:", "") : "";
  let email = data?.eMail ? data.eMail.replace("mailto:", "") : "";

  return (
    <section
      className={`contact-info-section ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`}`}
    >
      <div className="contact-info-hading">
        <div className="hading__title">
          {data.title && <h2>{data.title}</h2>}
          {data.subTitle && (
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.subTitle),
              }}
              onClick={(e) => sanitizeLink(e, router)}
            />
          )}
        </div>
        {data.linkText && (
          <Link className="btn" href={data.link} aria-label="link">
            {data.linkText}
          </Link>
        )}
      </div>
      {data.variation === "0" ? (
        <div className="contact-medium">
          {data.address && (
            <div className="contact-medium__box">
              <div className="box__icon">
                <FontAwesome.FaHome />
              </div>
              <div className="box__content">
                <h4>Office Address</h4>
                <p>{data.address}</p>
              </div>
            </div>
          )}
          {data?.contactNumber && (
            <div className="contact-medium__box">
              <div className="box__icon">
                <FontAwesome.FaPhoneAlt />
              </div>
              <div className="box__content">
                <h4>PHONE NUMBER</h4>
                <Link
                  href={`tel:${data.contactNumber ? data.contactNumber.replace(/\D/g, "") : ""}`}
                  className="content__link"
                  aria-label="contact"
                  target={data.contactNumber.target}
                >
                  {contact}
                </Link>
              </div>
            </div>
          )}
          {data.eMail && (
            <div className="contact-medium__box">
              <div className="box__icon">
                <FontAwesome.FaRegEnvelope />
              </div>
              <div className="box__content">
                <h4>EMAIL ADDRESS</h4>
                <Link
                  href={`mailto:${data.eMail}`}
                  className="content__link"
                  aria-label="email"
                  target={data.eMail.target}
                >
                  {email}
                </Link>
              </div>
            </div>
          )}
          {data.facebookLink.href ||
          data.twitterLink.href ||
          data.youtubeLink.href ? (
            <div className="contact-medium__box">
              <div className="box__icon">
                <FontAwesome.FaShareAlt />
              </div>
              <div className="box__content">
                <h4>social media</h4>

                {data.facebookLink.href && (
                  <div className="social-media">
                    <span>Facebook :</span>
                    <Link
                      href={data.facebookLink.href}
                      className="social__link"
                      aria-label="fb"
                      target={data.facebookLink.target}
                    >
                      {data.facebookLink.linkText}
                    </Link>
                  </div>
                )}
                {data.twitterLink.href && (
                  <div className="social-media">
                    <span>Twitter :</span>
                    <Link
                      href={data.twitterLink.href}
                      className="social__link"
                      aria-label="twitter"
                      target={data.twitterLink.target}
                    >
                      {data.twitterLink.linkText}
                    </Link>
                  </div>
                )}
                {data.youtubeLink.href && (
                  <div className="social-media">
                    <span>Youtube :</span>
                    <Link
                      href={data.youtubeLink.href}
                      className="social__link"
                      aria-label="yt"
                      target={data.youtubeLink.target}
                    >
                      {data.youtubeLink.linkText}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="contact-large">
          <ul className="contact-large__list">
            {data?.contactNumber && (
              <li>
                <FontAwesome.FaPhone />
                <span>Phone :</span>
                <Link
                  href={`tel:${data.contactNumber ? data.contactNumber.replace(/\D/g, "") : ""}`}
                  className="content__link"
                  aria-label="phone"
                  target={data.contactNumber.target}
                >
                  {contact}
                </Link>
              </li>
            )}
            {data.eMail && (
              <li>
                <FontAwesome.FaEnvelope />
                <span>Email :</span>
                <Link
                  href={`mailto:${data.eMail}`}
                  className="content__link"
                  aria-label="email"
                  target={data.eMail.target}
                >
                  {email}
                </Link>
              </li>
            )}
            {data.address !== "" && (
              <li>
                <FontAwesome.FaMapMarkerAlt />
                <span>Address Info : </span>
                {data.address}
              </li>
            )}
          </ul>
          <ul className="contact-large__social">
            {data.facebookLink?.href && (
              <li>
                <FontAwesome.FaFacebookF />
                <span>Facebook :</span>
                <Link
                  href={data.facebookLink.href}
                  className="content__link"
                  aria-label="fb"
                  target={data.facebookLink.target}
                >
                  {data.facebookLink.linkText}
                </Link>
              </li>
            )}
            {data.twitterLink?.href && (
              <li>
                <FontAwesome.FaTwitter />
                <span>Twitter :</span>
                <Link
                  href={data.twitterLink.href}
                  className="content__link"
                  aria-label="twitter"
                  target={data.twitterLink.target}
                >
                  {data.twitterLink.linkText}
                </Link>
              </li>
            )}
            {data.youtubeLink?.href && (
              <li>
                <FontAwesome.FaYoutube />
                <span>Youtube :</span>
                <Link
                  href={data.youtubeLink.href}
                  className="content__link"
                  aria-label="yt"
                  target={data.youtubeLink.target}
                >
                  {data.youtubeLink.linkText}
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </section>
  );
};

export default ContactInformation;
