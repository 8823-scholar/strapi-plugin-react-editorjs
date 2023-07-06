import React, { useState } from "react";
import PropTypes from "prop-types";
import { ModalLayout } from "@strapi/design-system";

export const ProductLinkComponent = ({
  isOpen,
  onChange,
  onToggle,
}) => {
  if(!isOpen) {
    return null;
  }

  return (
    <ModalLayout onClose={onToggle}>
      aaaa
    </ModalLayout>
  );

};

ProductLinkComponent.defaultProps = {
  isOpen: false,
  onChange: () => {},
  onToggle: () => {},
};

ProductLinkComponent.propTypes = {
  isOpen: PropTypes.bool,
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
};

export default ProductLinkComponent;
