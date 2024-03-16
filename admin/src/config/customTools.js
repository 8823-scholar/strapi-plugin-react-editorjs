import PluginId from '../pluginId'

import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
// import SimpleImage from '@editorjs/simple-image'

const customTools = {
  // simpleImage: SimpleImage,
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        twitter: true,
        x: {
          regex: /^https?:\/\/x\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+?.*)?$/,
          embedUrl: "https://twitframe.com/show?lang=ja&url=https://twitter.com/<%= remote_id %>",
          html: "<iframe width=\"600\" height=\"350\" style=\"margin: 0 auto;\" frameborder=\"0\" scrolling=\"no\" allowtransparency=\"true\"></iframe>",
          height: 350,
          width: 600,
          id: ids => ids.join("/status/"),
        },
      },
    },
  },
  table: {
    class: Table,
    inlineToolbar: true,
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  warning: {
    class: Warning,
    inlineToolbar: true,
    config: {
      titlePlaceholder: 'Title',
      messagePlaceholder: 'Message',
    },
  },
  code: Code,
  LinkTool: {
    class: LinkTool,
    config: {
      endpoint: `/api/${PluginId}/link`,
    },
  },
  raw: {
    class: Raw,
    inlineToolbar: true,
  },
  header: {
    class: Header,
    inlineToolbar: true,
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      quotePlaceholder: 'Quote',
      captionPlaceholder: 'Quote`s author',
    },
  },
  marker: {
    class: Marker,
    inlineToolbar: true,
  },
  checklist: {
    class: CheckList,
    inlineToolbar: true,
  },
  delimiter: Delimiter,
  inlineCode: InlineCode,
}

export default customTools
