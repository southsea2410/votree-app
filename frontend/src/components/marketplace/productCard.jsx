import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Product_test } from "../../assets/images";
import { StarIcon } from "../../assets/icons";
import "./../../index.css";
import { colors } from "../../styles";

const NUM_OF_STARS = 5;

export default function ProductCard({variant = "product"}) {
  const value = 3; // will update

  return (
    <Card
      variant={variant}
      style={{
        boxShadow:
          "0px 1px 3px 0px rgba(0, 0, 0, 0.12), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.20)",
      }}
    >
      <CardMedia
        variant="product"
        image={Product_test}
        title="flowers"
        style={{ marginBottom: 10 }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          // width: 348,
          height: 93,
          padding: "7px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "3px",
            justifyContent: "space-between",
          }}
        >
          <div class="content-medium-14-22">17.000.000 VND</div>
          <div class="subtitle-semi-bold-20" style={{ color: colors.green4 }}>
            Vegetable Name
          </div>
          <div>
            {[...Array(NUM_OF_STARS)].map((_, index) => (
              <StarIcon
                key={index}
                color={value > index ? colors.ratings : colors.primary}
              />
            ))}
          </div>
          <div style={{ display: "flex" }}>
            <div class="content-regular-12" style={{ width: 51, height: 10 }}>
              Sold By:
            </div>
            <div>Peter Parker</div>
          </div>
        </div>
        <CardActions style={{ padding: 0 }}>
          <Button variant="filled" color={variant === 'product' ? 'secondary' : 'primary'}>
            + Add to Cart
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}
