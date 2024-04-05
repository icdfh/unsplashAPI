import React from "react";
import JustInvi from "./JustInvi"; 

export const Images = ({ images }) => {
  return images.map((image) => (
    <JustInvi key={image.id} image={image} />
  ));
};
