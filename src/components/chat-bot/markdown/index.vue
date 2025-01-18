<script setup lang="ts">
  import MarkdownIt from 'markdown-it';
  import styles from './index.module.less';

  // 定义 props，接收外部传入的 markdown 内容
  const props = defineProps<{
    markdownText: string;
  }>();

  const md = MarkdownIt();

  const markdownTextTest = `
# React Markdown Example

- Some text
- Some other text

## Subtitle

### Additional info

This is a [link](https://github.com/remarkjs/react-markdown)

# React Markdown Example

~~~js
const aJsVariable = "Test";

console.log(aJsVariable);
~~~

`;
  // 使用 markdown-it 将 Markdown 转换为 HTML
  // const renderedMarkdown = md.render(markdownTextTest);
  const renderedMarkdown = md.render(props.markdownText);
</script>

<template>
  <div :class="styles.container">
    <!-- 渲染转换后的 HTML -->
    <div v-html="renderedMarkdown"></div>
  </div>
</template>
