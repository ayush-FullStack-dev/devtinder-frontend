"use client";

import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import { VscCode } from "react-icons/vsc";

type GetLogoProps = {
    name: string;
    className?: string;
    monochrome?: boolean;
};

const DynamicIcon = (
    loader: () => Promise<{
        default: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    }>
) =>
    dynamic(loader, {
        ssr: true,
        loading: () => (
            <div
                className="h-5 w-5 shrink-0"
                aria-hidden="true"
            />
        ),
    });

const iconMap = {
    /* =========================
       FRONTEND
    ========================= */

    react: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiReact,
        }))
    ),
    reactjs: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiReact,
        }))
    ),
    reactjslibrary: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiReact,
        }))
    ),

    next: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiNextdotjs,
        }))
    ),
    nextjs: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiNextdotjs,
        }))
    ),

    angular: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiAngular,
        }))
    ),
    angularjs: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiAngular,
        }))
    ),

    vue: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiVuedotjs,
        }))
    ),
    vuejs: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiVuedotjs,
        }))
    ),

    svelte: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiSvelte,
        }))
    ),
    sveltekit: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiSvelte,
        }))
    ),

    nuxt: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiNuxt,
        }))
    ),
    nuxtjs: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiNuxt,
        }))
    ),

    astro: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiAstro,
        }))
    ),

    jquery: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiJquery,
        }))
    ),

    html: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiHtml5,
        }))
    ),
    html5: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiHtml5,
        }))
    ),

    css: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiCss,
        }))
    ),
    css3: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiCss,
        }))
    ),

    sass: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiSass,
        }))
    ),
    scss: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiSass,
        }))
    ),

    less: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiLess,
        }))
    ),

    bootstrap: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiBootstrap,
        }))
    ),

    tailwind: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiTailwindcss,
        }))
    ),
    tailwindcss: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiTailwindcss,
        }))
    ),

    chakraui: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiChakraui,
        }))
    ),

    materialui: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiMaterialdesign,
        }))
    ),
    mui: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiMaterialdesign,
        }))
    ),

    shadcn: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiShadcnui,
        }))
    ),
    shadcnui: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiShadcnui,
        }))
    ),

    framer: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiFramer,
        }))
    ),
    framermotion: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiFramer,
        }))
    ),

    gsap: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiGsap,
        }))
    ),

    threejs: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiThreedotjs,
        }))
    ),
    three: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiThreedotjs,
        }))
    ),

    /* =========================
       LANGUAGES
    ========================= */

    javascript: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiJavascript,
        }))
    ),
    js: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiJavascript,
        }))
    ),

    typescript: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiTypescript,
        }))
    ),
    ts: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiTypescript,
        }))
    ),

    python: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiPython,
        }))
    ),
    py: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiPython,
        }))
    ),

    java: DynamicIcon(() =>
        import("react-icons/fa6").then((mod) => ({
            default: mod.FaJava,
        }))
    ),

    php: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiPhp,
        }))
    ),

    c: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiC,
        }))
    ),

    cpp: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiCplusplus,
        }))
    ),
    cplusplus: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiCplusplus,
        }))
    ),

    go: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiGo,
        }))
    ),
    golang: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiGo,
        }))
    ),

    rust: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiRust,
        }))
    ),

    ruby: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiRuby,
        }))
    ),

    kotlin: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiKotlin,
        }))
    ),

    swift: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiSwift,
        }))
    ),

    dart: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiDart,
        }))
    ),

    dotnet: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiDotnet,
        }))
    ),
    net: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiDotnet,
        }))
    ),
    csharp: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiDotnet,
        }))
    ),

    /* =========================
       BACKEND
    ========================= */

    node: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiNodedotjs,
        }))
    ),
    nodejs: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiNodedotjs,
        }))
    ),

    express: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiExpress,
        }))
    ),
    expressjs: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiExpress,
        }))
    ),

    nestjs: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiNestjs,
        }))
    ),
    nest: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiNestjs,
        }))
    ),

    laravel: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiLaravel,
        }))
    ),

    django: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiDjango,
        }))
    ),

    flask: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiFlask,
        }))
    ),

    fastapi: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiFastapi,
        }))
    ),

    spring: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiSpring,
        }))
    ),
    springboot: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiSpring,
        }))
    ),

    socketio: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiSocketdotio,
        }))
    ),

    mongoose: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiMongoose,
        }))
    ),

    /* =========================
       DATABASE
    ========================= */

    mongodb: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiMongodb,
        }))
    ),
    mongo: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiMongodb,
        }))
    ),

    mysql: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiMysql,
        }))
    ),

    postgresql: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiPostgresql,
        }))
    ),
    postgres: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiPostgresql,
        }))
    ),

    prisma: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiPrisma,
        }))
    ),

    redis: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiRedis,
        }))
    ),

    sqlite: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiSqlite,
        }))
    ),

    mariadb: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiMariadb,
        }))
    ),

    oracle: DynamicIcon(() =>
        import("react-icons/gr").then((mod) => ({
            default: mod.GrOracle,
        }))
    ),

    neo4j: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiNeo4J,
        }))
    ),

    elasticsearch: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiElasticsearch,
        }))
    ),

    cassandra: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiApachecassandra,
        }))
    ),

    dynamodb: DynamicIcon(() =>
        import("@/assets/icons/DynamodbDarkIcon").then((mod) => ({
            default: mod.default as unknown as IconType,
        }))
    ),

    database: DynamicIcon(() =>
        import("react-icons/fa6").then((mod) => ({
            default: mod.FaDatabase,
        }))
    ),

    /* =========================
       AUTH / BAAS
    ========================= */

    firebase: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiFirebase,
        }))
    ),

    supabase: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiSupabase,
        }))
    ),

    /* =========================
       CLOUD
    ========================= */

    aws: DynamicIcon(() =>
        import("react-icons/fa6").then((mod) => ({
            default: mod.FaAws,
        }))
    ),
    amazonwebservices: DynamicIcon(() =>
        import("react-icons/fa6").then((mod) => ({
            default: mod.FaAws,
        }))
    ),

    gcp: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiGooglecloud,
        }))
    ),
    googlecloud: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiGooglecloud,
        }))
    ),

    cloudflare: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiCloudflare,
        }))
    ),

    vercel: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiVercel,
        }))
    ),

    netlify: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiNetlify,
        }))
    ),

    digitalocean: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiDigitalocean,
        }))
    ),

    heroku: DynamicIcon(() =>
        import("react-icons/gr").then((mod) => ({
            default: mod.GrHeroku,
        }))
    ),

    railway: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiRailway,
        }))
    ),

    render: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiRender,
        }))
    ),

    /* =========================
       DEVOPS
    ========================= */

    docker: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiDocker,
        }))
    ),

    kubernetes: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiKubernetes,
        }))
    ),
    k8s: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiKubernetes,
        }))
    ),

    terraform: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiTerraform,
        }))
    ),

    ansible: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiAnsible,
        }))
    ),

    jenkins: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiJenkins,
        }))
    ),

    nginx: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiNginx,
        }))
    ),

    apache: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiApache,
        }))
    ),

    githubactions: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiGithubactions,
        }))
    ),

    linux: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiLinux,
        }))
    ),

    ubuntu: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiUbuntu,
        }))
    ),

    /* =========================
       BUILD TOOLS
    ========================= */

    vite: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiVite,
        }))
    ),

    webpack: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiWebpack,
        }))
    ),

    babel: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiBabel,
        }))
    ),

    npm: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiNpm,
        }))
    ),

    pnpm: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiPnpm,
        }))
    ),

    yarn: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiYarn,
        }))
    ),

    bun: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiBun,
        }))
    ),

    deno: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiDeno,
        }))
    ),

    /* =========================
       TESTING
    ========================= */

    jest: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiJest,
        }))
    ),

    vitest: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiVitest,
        }))
    ),

    cypress: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiCypress,
        }))
    ),

    playwright: DynamicIcon(() =>
        import("@/assets/icons/simple-icons-playwright").then((mod) => ({
            default: mod.PlaywrightIcon,
        }))
    ),

    /* =========================
       VERSION CONTROL
    ========================= */

    git: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiGit,
        }))
    ),

    github: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiGithub,
        }))
    ),

    gitlab: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiGitlab,
        }))
    ),

    /* =========================
       MOBILE
    ========================= */

    flutter: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiFlutter,
        }))
    ),

    reactnative: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiReact,
        }))
    ),

    expo: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiExpo,
        }))
    ),

    android: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiAndroid,
        }))
    ),

    ios: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiIos,
        }))
    ),

    /* =========================
       CMS
    ========================= */

    wordpress: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiWordpress,
        }))
    ),

    /* =========================
       DESIGN
    ========================= */

    figma: DynamicIcon(() =>
        import("react-icons/fa").then((mod) => ({
            default: mod.FaFigma,
        }))
    ),

    blender: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiBlender,
        }))
    ),

    aftereffects: DynamicIcon(() =>
        import("react-icons/tb").then((mod) => ({
            default: mod.TbBrandAdobeAfterEffect,
        }))
    ),
    adobeaftereffects: DynamicIcon(() =>
        import("react-icons/tb").then((mod) => ({
            default: mod.TbBrandAdobeAfterEffect,
        }))
    ),

    premierepro: DynamicIcon(() =>
        import("react-icons/tb").then((mod) => ({
            default: mod.TbBrandAdobePremiere,
        }))
    ),
    adobepremierepro: DynamicIcon(() =>
        import("react-icons/tb").then((mod) => ({
            default: mod.TbBrandAdobePremiere,
        }))
    ),

    davinciresolve: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiDavinciresolve,
        }))
    ),

    /* =========================
       EDITORS / TOOLS
    ========================= */

    vscode: DynamicIcon(() =>
        import("react-icons/vsc").then((mod) => ({
            default: mod.VscVscode,
        }))
    ),
    visualstudiocode: DynamicIcon(() =>
        import("react-icons/vsc").then((mod) => ({
            default: mod.VscVscode,
        }))
    ),

    intellij: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiIntellijidea,
        }))
    ),

    webstorm: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiWebstorm,
        }))
    ),

    postman: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiPostman,
        }))
    ),

    notion: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiNotion,
        }))
    ),

    trello: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiTrello,
        }))
    ),

    slack: DynamicIcon(() =>
        import("react-icons/fa").then((mod) => ({
            default: mod.FaSlack,
        }))
    ),

    discord: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiDiscord,
        }))
    ),

    /* =========================
       OTHER
    ========================= */

    graphql: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiGraphql,
        }))
    ),

    eslint: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiEslint,
        }))
    ),

    prettier: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiPrettier,
        }))
    ),

    electron: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiElectron,
        }))
    ),

    windows: DynamicIcon(() =>
        import("react-icons/fa").then((mod) => ({
            default: mod.FaWindows,
        }))
    ),

    apple: DynamicIcon(() =>
        import("react-icons/si").then((mod) => ({
            default: mod.SiApple,
        }))
    ),
};

const brandColorMap = {
    react: "#61DAFB",
    reactjs: "#61DAFB",
    reactjslibrary: "#61DAFB",
    next: "#000000",
    nextjs: "#000000",
    angular: "#DD0031",
    angularjs: "#DD0031",
    vue: "#4FC08D",
    vuejs: "#4FC08D",
    svelte: "#FF3E00",
    sveltekit: "#FF3E00",
    nuxt: "#00DC82",
    nuxtjs: "#00DC82",
    astro: "#BC52EE",
    jquery: "#0769AD",
    html: "#E34F26",
    html5: "#E34F26",
    css: "#663399",
    css3: "#663399",
    sass: "#CC6699",
    scss: "#CC6699",
    less: "#1D365D",
    bootstrap: "#7952B3",
    tailwind: "#06B6D4",
    tailwindcss: "#06B6D4",
    chakraui: "#319795",
    materialui: "#007FFF",
    mui: "#007FFF",
    shadcn: "#000000",
    shadcnui: "#000000",
    framer: "#0055FF",
    framermotion: "#0055FF",
    gsap: "#0AE448",
    threejs: "#000000",
    three: "#000000",

    javascript: "#F7DF1E",
    js: "#F7DF1E",
    typescript: "#3178C6",
    ts: "#3178C6",
    python: "#3776AB",
    py: "#3776AB",
    java: "#5382A1",
    php: "#777BB4",
    c: "#A8B9CC",
    cpp: "#00599C",
    cplusplus: "#00599C",
    go: "#00ADD8",
    golang: "#00ADD8",
    rust: "#000000",
    ruby: "#CC342D",
    kotlin: "#7F52FF",
    swift: "#F05138",
    dart: "#0175C2",
    dotnet: "#512BD4",
    net: "#512BD4",
    csharp: "#512BD4",

    node: "#339933",
    nodejs: "#339933",
    express: "#000000",
    expressjs: "#000000",
    nestjs: "#E0234E",
    nest: "#E0234E",
    laravel: "#FF2D20",
    django: "#092E20",
    flask: "#000000",
    fastapi: "#009688",
    spring: "#6DB33F",
    springboot: "#6DB33F",
    socketio: "#010101",
    mongoose: "#880000",

    mongodb: "#47A248",
    mongo: "#47A248",
    mysql: "#4479A1",
    postgresql: "#4169E1",
    postgres: "#4169E1",
    prisma: "#2D3748",
    redis: "#FF4438",
    sqlite: "#003B57",
    mariadb: "#003545",
    oracle: "#F80000",
    neo4j: "#008CC1",
    elasticsearch: "#005571",
    cassandra: "#1287B1",
    dynamodb: "#527FFF",

    firebase: "#FFCA28",
    supabase: "#3FCF8E",

    aws: "#FF9900",
    amazonwebservices: "#FF9900",
    gcp: "#4285F4",
    googlecloud: "#4285F4",
    cloudflare: "#F38020",
    vercel: "#000000",
    netlify: "#00C7B7",
    digitalocean: "#0080FF",
    heroku: "#430098",
    railway: "#000000",
    render: "#46E3B7",

    docker: "#2496ED",
    kubernetes: "#326CE5",
    k8s: "#326CE5",
    terraform: "#7B42BC",
    ansible: "#EE0000",
    jenkins: "#D33833",
    nginx: "#009639",
    apache: "#D22128",
    githubactions: "#2088FF",
    linux: "#FCC624",
    ubuntu: "#E95420",

    vite: "#646CFF",
    webpack: "#8DD6F9",
    babel: "#F9DC3E",
    npm: "#CB3837",
    pnpm: "#F9AD00",
    yarn: "#2C8EBB",
    bun: "#FBF0DF",
    deno: "#70FFAF",

    jest: "#C21325",
    vitest: "#6E9F18",
    cypress: "#69D3A7",
    playwright: "#2EAD33",

    git: "#F05032",
    github: "#181717",
    gitlab: "#FC6D26",

    flutter: "#02569B",
    reactnative: "#61DAFB",
    expo: "#000020",
    android: "#3DDC84",
    ios: "#000000",

    wordpress: "#21759B",

    figma: "#F24E1E",
    blender: "#F5792A",
    aftereffects: "#9999FF",
    adobeaftereffects: "#9999FF",
    premierepro: "#EA77FF",
    adobepremierepro: "#EA77FF",
    davinciresolve: "#E2A116",

    vscode: "#007ACC",
    visualstudiocode: "#007ACC",
    intellij: "#FE315D",
    webstorm: "#000000",
    postman: "#FF6C37",
    notion: "#000000",
    trello: "#0052CC",
    slack: "#4A154B",
    discord: "#5865F2",

    graphql: "#E10098",
    eslint: "#4B32C3",
    prettier: "#56B3B4",
    electron: "#47848F",
    windows: "#0078D4",
    apple: "#000000",
} satisfies Partial<
    Record<keyof typeof iconMap, string>
> as Record<string, string>;

const monochromeOverrideClassMap = {
    dynamodb:
        "[&_path]:fill-current [&_path]:stroke-none [&_rect]:fill-none [&_rect]:stroke-none",
} satisfies Partial<
    Record<keyof typeof iconMap, string>
> as Record<string, string>;

const normalizeName = (name: string) => {
    return name
        .toLowerCase()
        .trim()
        .replace(/[\s._-]+/g, "")
        .replace(/\+/g, "plus")
        .replace(/#/g, "sharp");
};

const GetLogo = ({
    name,
    className = "",
    monochrome = false,
}: GetLogoProps) => {
    const normalizedName = normalizeName(name);

    const Icon =
        iconMap[normalizedName as keyof typeof iconMap] ?? VscCode;

    const brandColor = monochrome
        ? undefined
        : brandColorMap[normalizedName];

    const monochromeOverrideClass = monochrome
        ? monochromeOverrideClassMap[normalizedName]
        : undefined;

    return (
        <Icon
            className={[
                "h-5 w-5 shrink-0",
                monochromeOverrideClass,
                className,
            ]
                .filter(Boolean)
                .join(" ")}
            style={brandColor ? { color: brandColor } : undefined}
            aria-label={`${name} logo`}
        />
    );
};

export default GetLogo;