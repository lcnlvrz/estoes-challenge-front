import React from "react";
import { Modal } from "antd";
import { IConfirModalProps } from "../types/confirmModal.type";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const ConfirmModal = (props: IConfirModalProps) => {
  return (
    <Modal
      visible={props.visible}
      title={props.modalTitle}
      closable={false}
      onCancel={props.onCancel}
      onOk={() => props.onOk(props.projectId)}
      okText={props.okText}
      cancelText={props.cancelText}
    >
      <div className="w-full flex flex-row items-center space-x-3">
        <ExclamationCircleOutlined className="text-4xl text-yellow-500" />
        <div>
          <h2 className="font-semibold text-lg">{props.question}</h2>
          <p>{props.explain}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
