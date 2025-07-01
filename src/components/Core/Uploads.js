"use client";

import Header from "./Heading";
import Link from "next/link";
import Image from "next/image";
import PDF from "@/assets/images/icons/pdf.webp";
import JPG from "@/assets/images/icons/jpg.webp";
import MP3 from "@/assets/images/icons/mp3.webp";
import MP4 from "@/assets/images/icons/mp4.png";

const Uploads = ({
  data,
  spaceAfter,
  spaceBefore,
  layoutType,
  elementType,
}) => {
  const {
    media,
    displayFileSizeInformation,
    displayDescription,
    displayInformation,
  } = data;
  return (
    <Header
      data={data}
      layoutType={layoutType}
      elementType={elementType}
      spaceBefore={spaceBefore}
      spaceAfter={spaceAfter}
    >
      <ul className={`ce-${elementType}`}>
        {media.map(({ publicUrl, properties }, index) => {
          return (
            <li key={index}>
              {displayInformation === "2" && (
                <Link href={`${publicUrl}`} target="_blank" aria-label="svg">
                  {properties.extension === "svg" && (
                    <Image
                      src={publicUrl}
                      alt={properties.alternative || "image"}
                      title={properties.title || "image"}
                      width={64}
                      height={64}
                    />
                  )}
                  {properties.extension === "mp4" && (
                    <video width={150} controls>
                      <source src={publicUrl} type="video/mp4" />
                    </video>
                  )}
                  {properties.extension === "mp3" && (
                    <audio controls>
                      <source src={publicUrl} type="audio/mpeg" />
                    </audio>
                  )}
                  {properties.extension === "jpg" && (
                    <Image
                      src={publicUrl}
                      alt={properties.alternative || "image"}
                      title={properties.title || "image"}
                      width={150}
                      height={150}
                    />
                  )}
                  {properties.extension === "pdf" && (
                    <Image
                      src={publicUrl}
                      alt={properties.alternative || "image"}
                      title={properties.title || "image"}
                      width={150}
                      height={85}
                    />
                  )}
                </Link>
              )}
              {displayInformation === "1" &&
                ((properties.extension === "pdf" && <img src={PDF.src} />) ||
                  (properties.extension === "jpg" && <img src={JPG.src} />) ||
                  (properties.extension === "mp3" && <img src={MP3.src} />) ||
                  (properties.extension === "mp4" && <img src={""} />) ||
                  (properties.extension === "svg" && <img src={""} />))}
              <div>
                <Link href={`${publicUrl}`} target="_blank" aria-label="file">
                  <span className="ce-uploads-fileName">
                    {properties.filename}
                  </span>
                </Link>
                {displayDescription === "1" && properties.description && (
                  <span className="ce-uploads-description">
                    {properties.description}
                  </span>
                )}
                {displayFileSizeInformation === "1" && properties.size && (
                  <span className="ce-uploads-filesize">{properties.size}</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Header>
  );
};
export default Uploads;
