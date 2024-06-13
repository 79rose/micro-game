<script setup lang="ts">
  import Card from "./card.vue";
  import Gradient from "./gradient.vue";

  const LINKS = [
    {
      title: "八皇后",
      href: "/games?tab=eight-queens",
      description: "数据结构小游戏",
    },
    {
      title: "最长子串",
      href: "/games?tab=longest-subsequence",
      description: "数据结构小游戏",
    },
    {
      title: "背包问题",
      href: "/games?tab=bag",
      description: "数据结构小游戏",
    },
  ];

  const props = defineProps<{
    appName: string;
  }>();
</script>

<template>
  <main class="main">
    <div class="description">
      <p>
        <code class="code">{{ props.appName }}</code>
      </p>

    </div>

    <div class="hero">
      <div class="heroContent">
        <div class="logos">
          <div class="circles">
            <img alt="game" height="614" src="./assets/circles.svg" width="614" />
          </div>

          <div class="logoGradientContainer">
            <Gradient class="logoGradient" :conic="true" :small="true" />
          </div>

          <div class="main-text">
            数据结构小游戏
          </div>
        </div>
        <Gradient class="backgroundGradient" conic />
      </div>
    </div>

    <div class="grid">
      <Card v-for="{ title, href, description } in LINKS" class="card" :href="href" :key="title" :title="title">
        {{ description }}
      </Card>
    </div>
  </main>
</template>

<style>
  /* @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"); */

  :root {
    --max-width: 1100px;
    --border-radius: 12px;
    --font-mono: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono",
      "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro",
      "Fira Mono", "Droid Sans Mono", "Courier New", monospace;

    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;

    --callout-rgb: 20, 20, 20;
    --callout-border-rgb: 108, 108, 108;
    --card-rgb: 100, 100, 100;
    --card-border-rgb: 200, 200, 200;

    --glow-conic: conic-gradient(from 180deg at 50% 50%,
        #2a8af6 0deg,
        #a853ba 180deg,
        #e92a67 360deg);
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
    font-family: "Inter", sans-serif;
  }

  body {
    color: rgb(var(--foreground-rgb));
    background: linear-gradient(to bottom,
        transparent,
        rgb(var(--background-end-rgb))) rgb(var(--background-start-rgb));
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 6rem;
    min-height: 100vh;
  }

  .vercelLogo {
    filter: invert(1);
  }

  .description {
    display: inherit;
    justify-content: inherit;
    align-items: inherit;
    font-size: 0.85rem;
    max-width: var(--max-width);
    width: 100%;
    z-index: 2;
    font-family: var(--font-mono);
  }

  .description a {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  .description p {
    position: relative;
    margin: 0;
    padding: 1rem;
    background-color: rgba(var(--callout-rgb), 0.5);
    border: 1px solid rgba(var(--callout-border-rgb), 0.3);
    border-radius: var(--border-radius);
  }

  .code {
    font-weight: 700;
    font-family: var(--font-mono);
  }

  .hero {
    display: flex;
    position: relative;
    place-items: center;
  }

  .heroContent {
    display: flex;
    position: relative;
    z-index: 0;
    padding-bottom: 4rem;
    flex-direction: column;
    gap: 2rem;
    justify-content: space-between;
    align-items: center;
    width: auto;
    font-family: system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial,
      "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol", "Noto Color Emoji";
    padding-top: 48px;

    @media (min-width: 768px) {
      padding-top: 4rem;
      padding-bottom: 6rem;
    }

    @media (min-width: 1024px) {
      padding-top: 5rem;
      padding-bottom: 8rem;
    }
  }

  .logos {
    display: flex;
    z-index: 50;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .grid {
    display: grid;
    /* grid-template-columns: repeat(4, minmax(25%, auto)); */
    max-width: 20%;
    width: var(--max-width);
    /* 垂直 */
    gap: 1rem;
    margin-top: -22rem;
    padding: 1rem;
    margin-left: 0;
    position: relative;
    transform: translate(-175%, 0);
  }

  .grid Card {
    display: flex;
    width: 50%;
  }

  .card {
    padding: 1rem 1.2rem;
    border-radius: var(--border-radius);
    background: rgba(var(--card-rgb), 0);
    border: 1px solid rgba(var(--card-border-rgb), 0);
    transition:
      background 200ms,
      border 200ms;
  }

  .card span {
    display: inline-block;
    transition: transform 200ms;
  }

  .card h2 {
    font-weight: 600;
    margin-bottom: 0.7rem;
  }

  .card p {
    margin: 0;
    opacity: 0.6;
    font-size: 0.9rem;
    line-height: 1.5;
    max-width: 30ch;
  }

  @media (prefers-reduced-motion) {
    .card:hover span {
      transform: none;
    }
  }

  /* Mobile */
  @media (max-width: 700px) {
    .content {
      padding: 4rem;
    }

    .grid {
      grid-template-columns: 1fr;
      margin-bottom: 120px;
      max-width: 320px;
      text-align: center;
    }

    .card {
      padding: 1rem 2.5rem;
    }

    .card h2 {
      margin-bottom: 0.5rem;
    }

    .center {
      padding: 8rem 0 6rem;
    }

    .center::before {
      transform: none;
      height: 300px;
    }


    .description p {

      position: fixed;
      top: 2rem;
      left: 2rem;

    }

    .heroContent {
      margin-top: 8rem;
      scale: 0.8;
    }

  }

  /* Enable hover only on non-touch devices */
  @media (hover: hover) and (pointer: fine) {
    .card:hover {
      background: rgba(var(--card-rgb), 0.1);
      border: 1px solid rgba(var(--card-border-rgb), 0.15);
    }

    .card:hover span {
      transform: translateX(4px);
    }
  }

  .circles {
    position: absolute;
    min-width: 614px;
    min-height: 614px;

    @media (max-width: 700px) {}
  }

  .main-text {
    z-index: 50;
    display: flex;
    place-items: center;
    text-shadow:
      1px 1px 1px #fff,
      -1px -1px 1px #000;
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    font-family: "Inter", sans-serif;
    text-align: center;
    line-height: 1.2;
    padding: 1rem;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(12px);
    width: 100%;
    animation: fadeIn 2s ease-in-out;

    @media (max-width: 700px) {
      font-size: 1.5rem;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }

  }

  .logoGradientContainer {
    display: flex;
    position: absolute;
    z-index: 50;
    justify-content: center;
    align-items: center;
    width: 16rem;
    height: 16rem;
  }

  .turborepoWordmarkContainer {
    display: flex;
    z-index: 50;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    flex-direction: column;
    gap: 1.25rem;
    justify-content: center;
    align-items: center;
    text-align: center;

    @media (min-width: 1024px) {
      gap: 1.5rem;
    }
  }

  .turborepoWordmark {
    width: 160px;
    fill: white;

    @media (min-width: 768px) {
      width: 200px;
    }
  }

  .code {
    font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
      monospace;
    font-weight: 700;
  }

  /* Tablet and Smaller Desktop */
  @media (min-width: 701px) and (max-width: 1120px) {
    .grid {
      grid-template-columns: repeat(2, 50%);
    }
  }

  /* Gradients */
  .gradient {
    position: absolute;
    mix-blend-mode: normal;
    will-change: filter;
  }

  .gradientSmall {
    filter: blur(32px);
  }

  .gradientLarge {
    filter: blur(75px);
  }

  .glowConic {
    background-image: var(--glow-conic);
  }

  .logoGradient {
    opacity: 0.9;
    width: 120px;
    height: 120px;
  }

  .backgroundGradient {
    top: -500px;
    width: 1000px;
    height: 1000px;
    opacity: 0.15;
  }
</style>
