import React from "react";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

import styles from "./contact.module.scss";

import CloseIcon from "../icons/close.svg";

import { List, ListItem } from "./ui-lib";

import { IconButton } from "./button";

import Locale from "../locales";
import { WECHATOFFICIALACCOUNT_QRCODE_URL, QQGROUP_QRCODE_URL } from "../constant";
import { ErrorBoundary } from "./error";


function ContactItem(props: {
  title: string;
  subTitle?: string;
  children: JSX.Element;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const renderQRCode = (): JSX.Element => {
    const size = isExpanded ? 128 : 16;
    return React.cloneElement(props.children, { size });
  };

  return (
    <ListItem>
      <div className={styles["contact-title"]}>
        <div>{props.title}</div>
        {props.subTitle && (
          <div className={styles["contact-sub-title"]}>{props.subTitle}</div>
        )}
      </div>
      <div
        className={`${isExpanded ? "qr-code-fullsize" : "qr-code-thumbnail"}`}
        onClick={toggleExpanded}
      >
        {renderQRCode()}
      </div>
    </ListItem>
  );
}

export function Contact(props: { closeContact: () => void }) {
  useEffect(() => {
    const keydownEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        props.closeContact();
      }
    };
    document.addEventListener("keydown", keydownEvent);
    return () => {
      document.removeEventListener("keydown", keydownEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ErrorBoundary>
      <div className={styles["window-header"]}>
        <div className={styles["window-header-title"]}>
          <div className={styles["window-header-main-title"]}>
            {Locale.Contact.Title}
          </div>
          <div className={styles["window-header-sub-title"]}>
            {Locale.Contact.SubTitle}
          </div>
        </div>
        <div className={styles["window-actions"]}>
          <div className={styles["window-action-button"]}>
            <IconButton
              icon={<CloseIcon />}
              onClick={props.closeContact}
              bordered
              title={Locale.Contact.Actions.Close}
            />
          </div>
        </div>
      </div>
      <div className={styles["contact"]}>
        <List>
          <ContactItem
            title={Locale.Contact.Account.WeChatOfficialAccount.Title}
            subTitle={Locale.Contact.Account.WeChatOfficialAccount.SubTitle}
          >
            <QRCodeCanvas value={WECHATOFFICIALACCOUNT_QRCODE_URL} />
          </ContactItem>
          <ContactItem
            title={Locale.Contact.Group.QQGroup.Title}
            subTitle={Locale.Contact.Group.QQGroup.SubTitle}
          >
            <QRCodeCanvas value={QQGROUP_QRCODE_URL} />
          </ContactItem>
        </List>
      </div>
    </ErrorBoundary>
  );
}
