<template>
  <footer id="page-footer">
    <div id="copyright-text">
      Copyright© 2018 Gentry Way Co., Ltd.
    </div>
  </footer>
</template>

<style scoped>
#page-footer {
  background-color: whitesmoke;
  grid-column: 1 / -1;
  padding: 0px;
  display: flex;
  justify-content: flex-end;
}

#copyright-text {
  font-weight: 100;
  font-size: 70%;
}

@media all and (max-width: 480px) {
  #page-footer {
    justify-content: center;
  }
}
</style>
