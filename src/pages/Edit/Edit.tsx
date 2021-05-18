import { ArrowLeftOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import React, { Fragment } from "react";
import { ProjectSchema } from "../../schemas/project.schema";
import { Form, Input, SubmitButton, Select } from "formik-antd";
import { useEditProject } from "../../controllers/edit-project.controller";
import { inputs } from "../../common/inputs";
import { Link } from "react-router-dom";

const Edit = () => {
  const controller = useEditProject();
  if (!controller.currentProject) {
    return (
      <div className="w-full h-screen p-5 items-center flex justify-center">
        <h1 className="text-black text-center font-semibold text-4xl">
          This project doesn't exist
        </h1>
      </div>
    );
  }
  return (
    <Fragment>
      <header className="flex bg-white flex-start w-full">
        <ul className="flex flex-col w-full">
          <li className="w-full py-2 px-5 flex items-start border border-b-2">
            <img src="https://bitbucket.org/estoes-challenges/fullstack/raw/1f381ad315a2e386bbdf6a60eb146c29a59a3336/assets/images/logo.png" />
          </li>
          <li className="w-full py-2 px-5 flex flex-row justify-between">
            <div className="flex flex-row space-x-5 items-center">
              <Link to="/">
                <button className="flex flex-row items-center space-x-2">
                  <ArrowLeftOutlined />
                  <span>Back</span>
                </button>
              </Link>
              <h2 className="font-semibold text-black text-2xl">
                Edit project
              </h2>
            </div>
          </li>
        </ul>
      </header>
      <main className="bg-white my-5">
        <Formik
          enableReinitialize
          validationSchema={ProjectSchema}
          onSubmit={(v) => controller.editProject(v)}
          initialValues={controller.currentProject as any}
        >
          {({}) => (
            <Form
              className="w-full flex flex-col items-start p-5"
              layout="vertical"
            >
              {inputs.map((field, index) => {
                if (field.type === "select")
                  return (
                    <Form.Item
                      className="w-full text-left"
                      label={
                        <label className="font-semibold">{field.label}</label>
                      }
                      name={field.name}
                      key={index}
                    >
                      <Select name={field.name} options={field.options} />
                    </Form.Item>
                  );
                return (
                  <Form.Item
                    className="w-full text-left"
                    label={
                      <label className="font-semibold">{field.label}</label>
                    }
                    name={field.name}
                    key={index}
                  >
                    <Input
                      style={{ height: "2rem", width: "100%" }}
                      name={field.name}
                    />
                  </Form.Item>
                );
              })}
              <SubmitButton
                loading={controller.isLoading}
                className="bg-red-500 border-red-500"
              >
                Create Project
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </main>
    </Fragment>
  );
};

export default Edit;
