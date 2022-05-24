<template>
    <router-view />
</template>
<script>
export default {
    name: "App"
};
</script>
<style lang="scss">
*,
::after,
::before {
    box-sizing: border-box;
}
body {
    background-color: #1a1a1a;
    color: rgba(255, 255, 255, 0.87);
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 18px;
    line-height: 1.2;
    margin: 0;
    @media (max-width: 768px) {
        font-size: 16px;
    }
    @media (max-width: 425px) {
        font-size: 14px;
    }
}
a {
    color: rgba(255, 255, 255, 0.87);
    font-weight: bold;
    text-decoration: unset;
}
h1,
h2,
h3 {
    margin: 0;
}
.container {
    max-width: 1054px;
    width: 100%;
    margin: 0 auto;
    padding: 0 15px;
}
</style>
