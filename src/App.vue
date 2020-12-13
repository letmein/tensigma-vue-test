<template>
  <div id="app" class="container">
    <nav id="nav" class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link
            class="navbar-item"
            exact-active-class="has-text-primary"
            to="/desktop">
            Desktop
          </router-link>
          <router-link
            class="navbar-item"
            exact-active-class="has-text-primary"
            to="/transactions">
            Transactions
          </router-link>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>