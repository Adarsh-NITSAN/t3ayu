import InputGroup from '@/components/Core/InputGroup'
import React from 'react'
import { Row, Col } from 'react-bootstrap'

const RenderInputs = ({
  elementsList,
  registerField,
  errors,
  setError,
  setValue,
  clearErrors,
  getValues,
  isSubmitted,
  additionalInfo,
}) => {
  let XXLColSize, XLColSize, LGColSize, MDColSize, SMColSize, XSColSize
  return elementsList.map((element, id) => {
    const {
      label,
      name,
      properties,
      elements,
      defaultValue,
      identifier,
      validators,
    } = element

    const type = element.type.toLowerCase()

    const ElementTypes = [
      'text',
      'textarea',
      'password',
      'email',
      'telephone',
      'url',
      'number',
      'date',
      'checkbox',
      'singleselect',
      'countryselect',
      'radiobutton',
      'multicheckbox',
      'multiselect',
      'fileupload',
      'datepicker',
      'imageupload',
      'advancedpassword',
      'statictext',
    ]

    if (type === 'gridrow') {
      return (
        <div key={id} className="cf-section">
          {label && <label className={`control-label`}>{label}</label>}
          <Row key={id}>
            {elements &&
              elements.length &&
              elements.map(
                (
                  {
                    label,
                    name,
                    properties,
                    type,
                    defaultValue,
                    identifier,
                    validators,
                  },
                  index
                ) => {
                  XXLColSize =
                    properties &&
                    properties.gridColumnClassAutoConfiguration &&
                    properties.gridColumnClassAutoConfiguration.viewPorts &&
                    properties.gridColumnClassAutoConfiguration.viewPorts.xxl &&
                    properties.gridColumnClassAutoConfiguration.viewPorts.xxl
                      .numbersOfColumnsToUse
                  XLColSize =
                    properties &&
                    properties.gridColumnClassAutoConfiguration &&
                    properties.gridColumnClassAutoConfiguration.viewPorts &&
                    properties.gridColumnClassAutoConfiguration.viewPorts.xl &&
                    properties.gridColumnClassAutoConfiguration.viewPorts.xl
                      .numbersOfColumnsToUse
                  LGColSize =
                    properties &&
                    properties.gridColumnClassAutoConfiguration &&
                    properties.gridColumnClassAutoConfiguration.viewPorts &&
                    properties.gridColumnClassAutoConfiguration.viewPorts.lg &&
                    properties.gridColumnClassAutoConfiguration.viewPorts.lg
                      .numbersOfColumnsToUse
                  MDColSize =
                    properties &&
                    properties.gridColumnClassAutoConfiguration &&
                    properties.gridColumnClassAutoConfiguration.viewPorts &&
                    properties.gridColumnClassAutoConfiguration.viewPorts.md &&
                    properties.gridColumnClassAutoConfiguration.viewPorts.md
                      .numbersOfColumnsToUse
                  SMColSize =
                    properties &&
                    properties.gridColumnClassAutoConfiguration &&
                    properties.gridColumnClassAutoConfiguration.viewPorts &&
                    properties.gridColumnClassAutoConfiguration.viewPorts.sm &&
                    properties.gridColumnClassAutoConfiguration.viewPorts.sm
                      .numbersOfColumnsToUse
                  XSColSize =
                    properties &&
                    properties.gridColumnClassAutoConfiguration &&
                    properties.gridColumnClassAutoConfiguration.viewPorts &&
                    properties.gridColumnClassAutoConfiguration.viewPorts.xs &&
                    properties.gridColumnClassAutoConfiguration.viewPorts.xs
                      .numbersOfColumnsToUse

                  return (
                    <Col
                      xs={XSColSize}
                      sm={SMColSize}
                      md={MDColSize}
                      lg={LGColSize}
                      xl={XLColSize}
                      xxl={XXLColSize}
                      className="col"
                      key={index}
                    >
                      <InputGroup
                        label={label}
                        name={name}
                        type={type.toLowerCase()}
                        defaultValue={defaultValue ? defaultValue : ''}
                        errors={errors}
                        identifier={identifier}
                        data={properties}
                        // layoutType={layoutType}
                        register={registerField}
                        validation={validators}
                        setError={setError}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        fieldAdditionalValue={additionalInfo}
                      />
                    </Col>
                  )
                }
              )}
          </Row>
        </div>
      )
    } else if (type === 'fieldset') {
      return (
        <fieldset key={id}>
          <legend>{label}</legend>
          {elements &&
            elements.length &&
            elements.map(
              (
                {
                  label,
                  name,
                  properties,
                  type,
                  defaultValue,
                  identifier,
                  validators,
                },
                index
              ) => {
                return (
                  <React.Fragment key={index}>
                    <InputGroup
                      label={label}
                      name={name}
                      type={type.toLowerCase()}
                      register={registerField}
                      defaultValue={defaultValue ? defaultValue : ''}
                      errors={errors}
                      identifier={identifier}
                      data={properties}
                      validation={validators}
                      setError={setError}
                      setValue={setValue}
                      clearErrors={clearErrors}
                      fieldAdditionalValue={additionalInfo}
                    />
                  </React.Fragment>
                )
              }
            )}
        </fieldset>
      )
    } else {
      if (ElementTypes.includes(type)) {
        return (
          <React.Fragment key={id}>
            <InputGroup
              label={label}
              name={name}
              type={type}
              register={registerField}
              defaultValue={defaultValue ? defaultValue : ''}
              errors={errors}
              identifier={identifier}
              data={properties}
              validation={validators}
              setError={setError}
              setValue={setValue}
              clearErrors={clearErrors}
              getValues={getValues}
              isSubmitted={isSubmitted}
              fieldAdditionalValue={additionalInfo}
            />
          </React.Fragment>
        )
      }
    }
  })
}
export default RenderInputs
