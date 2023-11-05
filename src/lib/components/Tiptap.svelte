<script lang="ts">
  import './Tiptap.scss';
  import { onMount, onDestroy } from 'svelte';
  import Placeholder from '@tiptap/extension-placeholder';
  import { Editor, type Content } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';

  export let content: Content | undefined = undefined;
  export let readOnly: boolean = false;
  export let onUpdate: (({ editor }: { editor: Editor }) => void) | undefined =
    undefined;
  export let onCreate: ((props: { editor: Editor }) => void) | undefined =
    undefined;

  let element: HTMLDivElement;
  let editor: Editor;

  onMount(() => {
    editor = new Editor({
      editable: !readOnly,
      content: content,
      element: element,
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: "Type what you're thinking about here…",
          showOnlyWhenEditable: false,
          emptyEditorClass: 'show-placeholder'
        })
      ],
      // content: `
      // <p>Hello World! 🌍️ </p>
      // <h1>✨ Are you ready</h1>
      // `,
      onCreate: onCreate,
      onUpdate: onUpdate,
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
      },
      editorProps: {
        attributes: {
          class:
            'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none'
        }
      }
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

{#if editor && !readOnly}
  <div class="flex items-center gap-x-2">
    <button
      type="button"
      on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      class:active={editor.isActive('heading', { level: 1 })}
    >
      H1
    </button>
    <button
      type="button"
      on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      class:active={editor.isActive('heading', { level: 2 })}
    >
      H2
    </button>
    <button
      type="button"
      on:click={() => editor.chain().focus().setParagraph().run()}
      class:active={editor.isActive('paragraph')}
    >
      P
    </button>
    <button
      type="button"
      on:click={() => editor.chain().focus().toggleCodeBlock().run()}
      class:active={editor.isActive('codeBlock')}
    >
      {'</> block'}
    </button>
    <button
      type="button"
      on:click={() => editor.chain().focus().toggleCode().run()}
      disabled={!editor.can().chain().focus().toggleCode().run()}
      class:active={editor.isActive('code')}
    >
      {'</> line'}
    </button>
    <button
      type="button"
      on:click={() => editor.chain().focus().toggleBlockquote().run()}
      class:active={editor.isActive('blockquote')}
    >
      " blockquote
    </button>
  </div>
{/if}

<div bind:this={element} />

<style lang="scss">
  button {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    display: grid;
    place-items: center;
  }
  button.active {
    background: white;
    color: black;
  }
</style>
