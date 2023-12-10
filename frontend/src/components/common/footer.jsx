import * as React from "react";
import { styled } from "@mui/material/styles";
import { colors } from "../../styles";
import { Divider } from "@mui/material";
import { LogoVoTree_secondary } from "../../assets/images";
import "./../../index.css";
import {
  FacebookIcon,
  InstaIcon,
  LinkedInIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon,
} from "../../assets/icons";

export default function Footer() {
  return (
    <div
      className="content-medium-16"
      style={{
        background: colors.green5,
        width: "100%",
        height: 250,
        color: colors.primary,
        padding: "30px 0px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0px 100px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img src={LogoVoTree_secondary} alt="" width="211" height="78" />
          </div>
          <div>
            <h4 style={{ color: colors.green2 }}>
              SE_10 Group - VoTree Project
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <LocationIcon color={colors.green2} />
                <div style={{ marginLeft: 8 }}>
                  227 Nguyen Van Cu, ward 10, district 5, HCM City
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <PhoneIcon color={colors.green2} />
                <div style={{ marginLeft: 8 }}>0901234567</div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <MailIcon color={colors.green2} />
                <div style={{ marginLeft: 8 }}>se10votree@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 40,
            justifyContent: "center",
            color: colors.green2,
          }}
        >
          <div>Main screen</div>
          <div>Sign in</div>
          <div>Sign up</div>
        </div>
      </div>
      <div style={{ marginTop: "40px", marginBottom: "23px" }}>
        <Divider variant="white" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0px 120px",
          alignItems: "center",
        }}
      >
        <div style={{ color: colors.primary }}>
          © 2023 SE_10 Group. All right reserved.
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          <FacebookIcon />
          <InstaIcon />
          <LinkedInIcon />
        </div>
      </div>
    </div>
  );
}
