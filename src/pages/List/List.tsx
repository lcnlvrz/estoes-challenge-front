import React, { Fragment } from "react";
import { PlusOutlined } from "@ant-design/icons";
import ListCard from "../../components/ListCard";
import { Divider, Pagination } from "antd";
import { useList } from "../../controllers/list-project.controller";
import moment from "moment";
import { Link } from "react-router-dom";

const List = () => {
  const controller = useList();

  return (
    <Fragment>
      <header className="flex bg-white flex-start w-full">
        <ul className="flex flex-col w-full">
          <li className="w-full py-2 px-5 flex items-start border border-b-2">
            <h1 className="text-gray-400 font-semibold text-2xl">LOGO</h1>
          </li>
          <li className="w-full py-2 px-5 flex flex-row justify-between">
            <h2 className="font-semibold text-black text-2xl">My Projects</h2>
            <Link to="/create">
              <button className="bg-red-500 text-white p-2 items-center flex flex-row space-x-2 rounded">
                <PlusOutlined />
                <span> Add Project</span>
              </button>
            </Link>
          </li>
        </ul>
      </header>
      <main className="w-full my-5">
        {controller.projectConsumer.projects.length ? (
          <Fragment>
            <ul>
              {controller.projectConsumer.projects.map((project, index) => (
                <Fragment key={index}>
                  <ListCard {...project} />
                  <Divider
                    style={{ background: "white", margin: 0 }}
                    className="bh-white"
                  />
                </Fragment>
              ))}
            </ul>
            <div className="w-full flex items-center justify-center p-5">
              <Pagination
                onChange={(page) => {
                  if (controller.projectConsumer.setPage) {
                    controller.projectConsumer.setPage(page);
                  }
                }}
                current={controller.projectConsumer.page}
                pageSize={5}
                total={controller.projectConsumer.total}
              />
            </div>
          </Fragment>
        ) : (
          <div className="text-center">
            <h1 className="text-lg font-semibold"> Any project created yet</h1>
          </div>
        )}
      </main>
    </Fragment>
  );
};

export default List;
