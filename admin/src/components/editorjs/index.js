import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { createReactEditorJS } from 'react-editor-js';

import requiredTools from './requiredTools';
import customTools from '../../config/customTools';

import { MediaLibAdapter, MediaLibComponent, changeFunc, getToggleFunc } from '../medialib'
import { ProductLinkTool, ProductLinkComponent, changeProductLinkFunc } from '../ProductLink';

const Editor = ({ onChange, name, value }) => {
  const EditorJs = useMemo(() => {
    return createReactEditorJS();
  }, []);

  const [editorInstance, setEditorInstance] = useState();
  const [mediaLibBlockIndex, setMediaLibBlockIndex] = useState(-1);
  const [isMediaLibOpen, setIsMediaLibOpen] = useState(false);
  const [productLinkBlockIndex, setProductLinkBlockIndex] = useState(-1);
  const [isProductLinkOpen, setIsProductLinkOpen] = useState(false);

  const mediaLibToggleFunc = useCallback(getToggleFunc({
    openStateSetter: setIsMediaLibOpen,
    indexStateSetter: setMediaLibBlockIndex
  }), []);

  const handleMediaLibChange = useCallback((data) => {
    changeFunc({
        indexStateSetter: setMediaLibBlockIndex,
        data,
        index: mediaLibBlockIndex,
        editor: editorInstance
    });
    mediaLibToggleFunc();
  }, [mediaLibBlockIndex, editorInstance]);

  const productLinkToggleFunc = useCallback(getToggleFunc({
    openStateSetter: setIsProductLinkOpen,
    indexStateSetter: setProductLinkBlockIndex,
  }), []);

  const handleProductLinkChange = useCallback((data) => {
    changeProductLinkFunc({
      editor: editorInstance,
      data,
      index: productLinkBlockIndex,
    });
  }, [productLinkBlockIndex, editorInstance]);

  const additionalTools = {
    mediaLib: {
      class: MediaLibAdapter,
      config: {
        mediaLibToggleFunc,
      },
    },
    productLink: {
      class: ProductLinkTool,
      config: {
        toggleFunc: productLinkToggleFunc,
      },
    },
  }

  const onInitialize = useCallback((editorCore) => {
    setEditorInstance(editorCore.dangerouslyLowLevelInstance);
  }, []);

  const onChangeHandler = useCallback((api) => {
    api.saver.save().then((outputData) => {
      onChange({ target: { name, value: JSON.stringify(outputData) } });
    });
  }, [name, editorInstance]);

  return (
    <>
      <div style={{ border: `1px solid rgb(227, 233, 243)`, borderRadius: `2px`, marginTop: `4px`, paddingRight: "16px" }}>
        <EditorJs
          // data={JSON.parse(value)}
          // enableReInitialize={true}
          defaultValue={value ? JSON.parse(value) : null}
          tools={{...requiredTools, ...additionalTools, ...customTools}}
          onInitialize={onInitialize}
          onChange={onChangeHandler}
        />
      </div>
      <MediaLibComponent
        isOpen={isMediaLibOpen}
        onChange={handleMediaLibChange}
        onToggle={mediaLibToggleFunc}
      />
      <ProductLinkComponent
        isOpen={isProductLinkOpen}
        onChange={handleProductLinkChange}
        onToggle={productLinkToggleFunc}
      />
    </>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default Editor;
