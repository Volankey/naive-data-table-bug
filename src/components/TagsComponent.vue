<template>
    <n-dynamic-tags type="info" closable round v-model:value="tagNames" @update:value="handleUpdateTags">
    </n-dynamic-tags>
</template>
<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue'
import { TagModel } from './models'

export declare type TagChangeHook = (tag: TagModel) => void;

export default defineComponent({
    props: {
        selected: {
            type: Object as PropType<Array<TagModel>>
        },
        beforeAddFn:{
             type: Function as PropType<TagChangeHook>
        },
        beforeDeleteFn:{
             type: Function as PropType<TagChangeHook>
        },
        afterAddFn:{
             type: Function as PropType<TagChangeHook>
        },
        afterDeleteFn:{
            type: Function as PropType<TagChangeHook>
        },
    },
    data() {
        const inputValueRef = ref('');
        const tags = this.selected ?? [];
        return {
            inputValue: inputValueRef,
            tags: tags,
            tagNames: tags.map((tag) => tag.name)
        };
    },
    methods: {
        handleUpdateTags(tags: string[]) {
            let toDelete = this.tags.filter((t) => tags.indexOf(t.name) < 0) as TagModel[];
            let toAdd = tags.filter(name => this.tags.map(t => t.name).indexOf(name) < 0);
            toAdd.forEach(t => this.handleAdd({ name: t } as TagModel));
            toDelete.forEach(t => this.handleDelete(t));

        },
        handleAdd(newTag: TagModel) {
            if(this.beforeAddFn) {
                this.beforeAddFn(newTag);
            }
            if(this.afterAddFn){
                this.afterAddFn(newTag);
            }

        },
        handleDelete(deleteTag: TagModel) {
            if(this.beforeDeleteFn) {
                this.beforeDeleteFn(deleteTag);
            }
            if(this.afterDeleteFn) {
                this.afterDeleteFn(deleteTag);
            }
        }
    }
})
</script>