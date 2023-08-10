<script lang="ts">
  import { formatRelative, subDays } from 'date-fns';
  import type { Todo } from '$lib/types';
  import { getUser } from '$lib/stores';

  export let todo: Todo;
</script>

<div class="flex flex-col p-5 m-4 rounded-md shadow-sm bg-white shadow-gray-400">
  <div class="text-left text-lg font-semibold">{todo.title}</div>
  <div class="flex flex-row">
    <span class="flex-1 basis-10/12 pt-5 text-sm"
      >{formatRelative(subDays(new Date(), 6), todo.createdAt)}</span
    >
    <span
      ><img
        class="inline-block h-10 w-10 rounded-full ring-2 ring-white"
        src={getUser(todo.user).avatar}
        alt="avatar"
      /></span
    >
  </div>
</div>
