"use client";

import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import React, { useEffect, useRef, useState } from "react";
import RenderInputs from "@/utils/renderInputs";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Header from "../Core/Heading";

const CustomForm = ({ data, spaceBefore, spaceAfter, layoutType }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    clearErrors,
    watch,
    getValues,
  } = useForm();

  const [modalShow, setModalShow] = useState(false);
  const t = useTranslations();
  const { form, form_additional, link } = data;
  const password = useRef({});
  const router = useRouter();
  password.current = watch("password", "");

  const submitData = async (values) => {
    const { tx_form_formframework } = values;

    const availableData = Object.values(tx_form_formframework)[0];

    if (errors) {
      const formData = new FormData();

      Object.entries(availableData).map((inValue) => {
        formData.append(inValue[0], inValue[1].value);
      });

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL.slice(0, -1)}${data.link.href}`,
          formData
        );

        if (res.status === 200) {
          router.push(`${form_additional.finishers[0].link}`);
        }
      } catch (e) {
        console.log(e, "e");
      }
    }
  };

  const required = false;

  const confirmSubmit = () => {
    setModalShow(false);
    router.push(`${form_additional.finishers[0].link}`);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (document.getElementsByClassName("modern-newslatter").length) {
        Array.from(document.getElementsByClassName("modern-newslatter")).map(
          (data, index) => {
            if (data.querySelector(".control-label")) {
              let btnPosition =
                data.querySelector(".control-label").offsetHeight;

              data.getElementsByClassName(
                "btn-submit"
              )[0].style.top = `${btnPosition}px`;
            }
          }
        );
      }
    }
  });

  const renderElement = () => {
    return (
      <RenderInputs
        elementsList={form && form.elements}
        registerField={register}
        errors={errors}
        setError={setError}
        setValue={setValue}
        clearErrors={clearErrors}
        getValues={getValues}
        additionalInfo={form_additional}
      />
    );
  };

  const renderButton = () => {
    return (
      <>
        {form_additional &&
          form_additional.renderingOptions &&
          form_additional.renderingOptions.submitButtonLabel && (
            <div className="submit-btn">
              <Button className="btn" type="submit">
                {form_additional.renderingOptions.submitButtonLabel}
              </Button>
            </div>
          )}
      </>
    );
  };

  return (
    <section
      className={`contact-form ${
        spaceBefore && `frame-space-before-${spaceBefore}`
      } ${spaceAfter && `frame-space-after-${spaceAfter}`} 
    
      ${layoutType === "layout-1" ? "bottom-border white-bg" : "with-border"}
      ${
        layoutType === "layout-3" || layoutType === "layout-4"
          ? ""
          : layoutType === "layout-1"
          ? ""
          : "white-bg"
      }
      ${layoutType === "default" ? "white-input-bg" : ""}
      `}
    >
      <Form
        onSubmit={handleSubmit(submitData)}
        noValidate
        className={`custom-form ${required ? "invalid" : "init"} ${
          layoutType === "layout-3" || layoutType === "layout-4"
            ? ""
            : "field-space"
        } ${layoutType === "layout-4" && "classic-newslatter"} ${
          layoutType === "layout-3" && "modern-newslatter"
        }`}
      >
        {form_additional.header && (
          <Header
            level={form_additional.headerLayout}
            data={form_additional.header}
            position={form_additional.headerPosition}
            headerLink={form_additional.headerLink}
          />
        )}

        {form_additional.subheader && (
          <p className="form-subheader">{form_additional.subheader}</p>
        )}
        {data && layoutType === "layout-3" ? (
          <div className="form-layout-modern">
            {data && renderElement()}
            {renderButton()}
          </div>
        ) : layoutType === "layout-4" ? (
          <>
            <div className="form-layout-classic">{data && renderElement()}</div>
            {renderButton()}
          </>
        ) : (
          <>
            {data && renderElement()}
            {renderButton()}
          </>
        )}

        <span className="spinner"></span>

        {layoutType === "layout-3" || layoutType === "layout-4" ? null : (
          <>
            {Object.values(errors).length !== 0 && (
              <div className="response-output">
                One or more fields have an error. Please check and try again.
              </div>
            )}
          </>
        )}
      </Form>
    </section>
  );
};
export default CustomForm;
