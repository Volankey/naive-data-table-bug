<template>
    <n-data-table 
        ref="table"
        size="large"
        :loading="tableLoading"
        :columns="columns" 
        :bordered="true"
        :single-line="true"
        :data="models" 
        :pagination="pagination"
        @update:page="handlePageChange"
        @update:pageSize="handlePageSizeChange" 
    />
</template>
<script lang="ts">
import {ref, defineComponent, reactive, h} from 'vue'
import Tags from './TagsComponent.vue'
import {TagModel} from './models'

const createColumns = function(renderTags: (model: any) => any) {
    return reactive([
    {
        title: "Name",
        key: "name",
        width: "300px",
        ellipsis: {
            tooltip: true,
        },
    },  
    {
        title: 'Tags',
        key: 'tags',
        ellipsis: {
            tooltip: true,
        },
        render: renderTags
    }]);
}

export default defineComponent({
    data() {
        const pagination = {
            page: 1,
            pageSize: 5,
            itemCount: 0,
            pageCount: 0,
            showSizePicker: true,
            pageSizes: [5, 10, 20],
            prefix(info: any){
                return `Total ${info.itemCount}`;
            }
        };
        let models: any[] = [];
        const tableLoading = ref(false);
        return {
            tableLoading: tableLoading,
            models,
            columns: createColumns(this.generateTagsComponent as (arg: any) => any),
            pagination,
        };
    },
    methods: {
        generateTagsComponent(model: any) {
            return h(
                Tags,
                {
                    selected: model.tags,
                    afterAddFn: (tag: TagModel) => {
                         model.tags.push(tag);
                    },
                    beforeDeleteFn: (tag: TagModel) => {
                        const index = model.tags.indexOf(tag);
                        model.tags.spilce(index, 1);
                    }
                },
                {
                }
            );
        },
        loadData() {
            this.models = [
                {
                    id: 1,
                    name: "Name1",
                    tags: []
                },
                {
                    id: 2,
                    name: "Name2",
                    tags: []
                },
                {
                    id: 3,
                    name: "Name3",
                    tags: []
                },
                {
                    id: 4,
                    name: "Name4",
                    tags: []
                },
                {
                    id: 5,
                    name: "Name5",
                    tags: []
                },
                {
                    id: 6,
                    name: "Name6",
                    tags: []
                },
                {
                    id: 7,
                    name: "Name7",
                    tags: []
                },
            ];
        },
        handlePageChange(page: number) {
            this.pagination.page = page;
        },
        handlePageSizeChange(pageSize: number) {
            this.pagination.pageSize = pageSize;
        },
    },
    mounted() {
        this.loadData();
    }
})
</script>