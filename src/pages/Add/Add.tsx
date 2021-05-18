import { ArrowLeftOutlined } from "@ant-design/icons";
import { Formik } from "formik";
import React, { Fragment } from "react";
import { ProjectSchema } from "../../schemas/project.schema";
import { ICreateProject } from "../../types/projectContext.type";
import { Form, Input, SubmitButton, Select } from "formik-antd";
import { useAddProject } from "../../controllers/add-project.controller";
import { inputs } from "../../common/inputs";
import { Link } from "react-router-dom";
const Add = () => {
  const controller = useAddProject();

  return (
    <Fragment>
      <header className="flex bg-white flex-start w-full">
        <ul className="flex flex-col w-full">
          <li className="w-full py-2 px-5 flex items-start border border-b-2">
            <h1 className="text-gray-400 font-semibold text-2xl">LOGO</h1>
          </li>
          <li className="w-full py-2 px-5 flex flex-row justify-between">
            <div className="flex flex-row space-x-5 items-center">
              <Link to="/">
                <button className="flex flex-row items-center space-x-2">
                  <ArrowLeftOutlined />
                  <span>Back</span>
                </button>
              </Link>
              <h2 className="font-semibold text-black text-2xl">Add Project</h2>
            </div>
          </li>
        </ul>
      </header>
      <main className="bg-white my-5">
        <Formik
          validationSchema={ProjectSchema}
          onSubmit={(v) => controller.addProject(v)}
          initialValues={
            {
              assignedTo: "",
              description: "",
              name: "",
              projectManager: "",
              status: "",
            } as ICreateProject
          }
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

export default Add;
