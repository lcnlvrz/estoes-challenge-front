import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import React, { Fragment } from "react";
import { IProject } from "../types/projectContext.type";
import { Avatar, Dropdown, Menu, Spin } from "antd";
import { useHistory } from "react-router-dom";
import { useListCard } from "../controllers/list-card.controller";
import moment from "moment";
import ConfirmModal from "./ConfirmModal";

const ListCard = (props: IProject) => {
  const history = useHistory();

  const controller = useListCard();

  const menuOptions = (
    <Menu>
      <Menu.Item
        onClick={() => history.push(`/edit/?projectId=${props.id}`)}
        icon={<EditOutlined />}
      >
        {" "}
        Edit{" "}
      </Menu.Item>
      <Menu.Item
        onClick={() => controller.handleVisibleModal()}
        icon={<DeleteOutlined />}
      >
        {" "}
        Delete{" "}
      </Menu.Item>
    </Menu>
  );

  return (
    <Fragment>
      <li className="bg-white p-2 relative justify-between w-full flex flex-row items-start">
        {controller.isLoading && (
          <div className="absolute bg-white bg-opacity-50 h-full z-10 w-full flex items-center justify-center">
            <Spin />
          </div>
        )}
        <div className="space-y-2 flex flex-col items-start">
          <div className="text-left">
            <h1 className="font-semibold text-lg"> {props.name} </h1>
            <p className="font-light">
              Creation Date:{" "}
              {moment(props.createdAt).format("DD/MM/YY hh:mm A")}
            </p>
          </div>
          <div className="flex flex-row space-x-2 items-center">
            <Avatar
              src="https://www.stockvault.net//data/2013/09/14/147895/thumb16.jpg"
              size="small"
            />
            <p className="font-semibold text-gray-500"> {props.assignedTo} </p>
          </div>
        </div>
        <div className="my-2">
          <Dropdown trigger={["click"]} overlay={menuOptions}>
            <button>
              <MoreOutlined className="text-gray text-2xl" />
            </button>
          </Dropdown>
        </div>
      </li>
      <ConfirmModal
        question="Are you sure to delete this project?"
        projectId={props.id}
        explain="If you delete this one, you wont roll back."
        visible={controller.visibleConfirm}
        onOk={controller.deleteOne}
        onCancel={controller.handleVisibleModal}
        okText="Delete"
        modalTitle="Delete Project"
        cancelText="Cancel"
      />
    </Fragment>
  );
};

export default ListCard;
