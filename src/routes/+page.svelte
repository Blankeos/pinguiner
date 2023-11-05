<script lang="ts">
  import { Tiptap } from '@/lib/components';
  import { formatFromNow } from '@/lib/dateUtils.js';
  import type { Editor } from '@tiptap/core';

  export let data;

  let contentCount = 0;
  let content: any;
  let editor: Editor;
</script>

<main class="h-screen overflow-auto bg-gray-900 text-white">
  <div class="mx-auto w-full max-w-7xl px-7 py-10">
    <div class="flex flex-col items-center pb-10">
      <h1 class="text-center text-2xl font-semibold">🐧 Pinguiner</h1>
      <p class="text-sm text-gray-500">
        Kinda like Twitter but Rich-Text. Made by Carlo
      </p>
    </div>

    <form
      class="overflow-hidden rounded-md border border-gray-100 border-opacity-30"
      action="?/createArticle"
      method="POST"
    >
      <div class="flex items-center gap-x-5 px-5 py-5">
        <label for="article-title" class="font-semibold">Title</label>
        <input
          id="article-title"
          type="text"
          name="title"
          class="border-b border-gray-50 border-opacity-30 bg-transparent px-3 py-2 text-gray-50 outline-none focus:border-opacity-80"
          placeholder="My first Pinguin"
        />
      </div>

      <Tiptap
        onCreate={({ editor: _editor }) => {
          editor = _editor;
        }}
        onUpdate={({ editor: _editor }) => {
          contentCount = _editor.getText().length;
          content = JSON.stringify(_editor.getJSON());
        }}
      />
      <div class=" my-2 flex justify-end px-5 text-xs text-gray-500">
        {contentCount} / 280
      </div>
      <input
        name="content"
        type="text"
        value={content}
        class="hidden text-gray-500"
        aria-hidden
      />
      <button
        type="submit"
        class="w-full bg-gray-50 py-3 text-gray-600 transition hover:bg-gray-100"
        >{'🐧 Pinguin it!'}</button
      >
    </form>

    <!-- <pre>
      {JSON.stringify(data.articles, null, 2)}
    </pre> -->
    <div class="mt-5 flex flex-col gap-y-5">
      {#each data.articles as article (article.id)}
        <div class="rounded-md border py-5">
          <div class="flex items-center gap-x-5 px-5">
            <h2>
              {article.title}
            </h2>
            <span class="text-sm text-gray-500"
              >{formatFromNow(article.updatedAt)}</span
            >
          </div>
          {#if article.content}
            <Tiptap readOnly={true} content={JSON.parse(article.content)} />
          {/if}
        </div>
      {/each}
    </div>
  </div>
</main>
