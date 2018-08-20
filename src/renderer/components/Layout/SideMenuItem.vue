<template>
  <el-tooltip
    :disabled="!collapsed"
    :content="tooltipContent"
    class="item"
    effect="dark"
    placement="right">
    <router-link
      :to="routeName"
      :class="className">
      <i :class="[isMain ? icon : '', collapsed ? 'hidden' : '']"></i>
      <span>{{ displayName }}</span>
      <div class="collapsed">
        <i
          :class="icon"
          style="font-size: 13px;"></i>
      </div>
    </router-link>
  </el-tooltip>
</template>

<script>
export default {
  name: "SideMenuItem",
  props: {
    isMain: {
      type: Boolean,
      required: true
    },
    collapsed: {
      type: Boolean,
      required: true
    },
    tooltipContent: {
      type: String,
      required: true
    },
    routeName: {
      type: Object,
      required: true
    },
    displayName: {
      type: String,
      required: true
    },
    className: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
};
</script>
