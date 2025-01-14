<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import styles from './index.module.less';

  // 定义数据结构接口
  interface Order {
    id: number;
    customerName: string;
    orderDate: string;
    amount: number;
    status: string;
  }

  // 模拟 API 数据
  const mockData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    customerName: `客户 ${i + 1}`,
    orderDate: `2025-01-${(i % 31) + 1}`,
    amount: (i + 1) * 100, // 订单金额
    status: i % 2 === 0 ? 'Completed' : 'Pending', // 订单状态
  }));

  // 表格数据与分页
  const tableData = ref<Order[]>([]);
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: mockData.length,
  });

  // 表格列定义
  const columns = [
    {
      title: '订单 ID',
      dataIndex: 'id',
    },
    {
      title: '客户名称',
      dataIndex: 'customerName',
    },
    {
      title: '订单日期',
      dataIndex: 'orderDate',
    },
    {
      title: '订单金额',
      dataIndex: 'amount',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
    },
  ];

  // 加载表格数据
  const loadTableData = () => {
    const startIndex = (pagination.current - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    tableData.value = mockData.slice(startIndex, endIndex);
  };

  // 初始化加载
  onMounted(loadTableData);

  // 分页变化处理
  const onPageChange = (page: number) => {
    pagination.current = page;
    loadTableData();
  };

  // 每页条数变化处理
  const onPageSizeChange = (size: number) => {
    pagination.pageSize = size;
    pagination.current = 1;
    loadTableData();
  };

  // 删除操作
  const deleteOrder = (id: number) => {
    Message.success(`订单 ${id} 已删除`);
    // 这里可以加入实际的删除逻辑
  };
</script>

<template>
  <div :class="styles.container">
    <div :class="styles.header">
      <h3>订单列表</h3>
    </div>
    <a-table :columns="columns" :data="tableData" :row-key="'id'">
      <!-- 自定义状态显示 -->
      <template #status="{ record }">
        <a-tag :color="record.status === 'Completed' ? 'green' : 'orange'">
          {{ record.status }}
        </a-tag>
      </template>

      <!-- 自定义操作列 -->
      <template #actions="{ record }">
        <a-button
          type="text"
          status="danger"
          size="small"
          @click="deleteOrder(record.id)"
        >
          删除
        </a-button>
      </template>
    </a-table>
  </div>
</template>
