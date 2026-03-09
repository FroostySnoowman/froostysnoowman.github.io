import apiImg from "../public/img/skills/api.svg";
import authImg from "../public/img/skills/auth.svg";
import awsImg from "../public/img/skills/aws.svg";
import cloudflareImg from "../public/img/skills/cloudflare.svg";
import cloudwatchImg from "../public/img/skills/cloudwatch.svg";
import debugImg from "../public/img/skills/debug.svg";
import dockerImg from "../public/img/skills/docker.svg";
import e2eImg from "../public/img/skills/e2e.svg";
import gitImg from "../public/img/skills/git.svg";
import javaImg from "../public/img/skills/java.svg";
import jestImg from "../public/img/skills/jest.svg";
import jwtImg from "../public/img/skills/jwt.svg";
import kotlinImg from "../public/img/skills/kotlin.svg";
import linuxImg from "../public/img/skills/linux.svg";
import logImg from "../public/img/skills/log.svg";
import nextjsImg from "../public/img/skills/nextjs.svg";
import nodeImg from "../public/img/skills/node.svg";
import postgresImg from "../public/img/skills/postgres.svg";
import pythonImg from "../public/img/skills/python.svg";
import pytorchImg from "../public/img/skills/pytorch.svg";
import reactImg from "../public/img/skills/react.svg";
import redisImg from "../public/img/skills/redis.svg";
import sqlImg from "../public/img/skills/sql.svg";
import swiftImg from "../public/img/skills/swift.svg";
import tensorflowImg from "../public/img/skills/tensorflow.svg";
import testingImg from "../public/img/skills/testing.svg";
import typescriptImg from "../public/img/skills/typescript.svg";
import viteImg from "../public/img/skills/vite.svg";
import websocketImg from "../public/img/skills/websocket.svg";

const skills = [
  {
    id: 1,
    title: "Web Development",
    subSkills: [
      {
        name: "TypeScript",
        image: typescriptImg,
      },
      {
        name: "React",
        image: reactImg,
      },
      {
        name: "Next.js",
        image: nextjsImg,
      },
      {
        name: "Vite",
        image: viteImg,
      },
    ],
  },
  {
    id: 2,
    title: "Mobile Development",
    subSkills: [
      {
        name: "React Native",
        image: reactImg,
      },
      {
        name: "Swift",
        image: swiftImg,
      },
      {
        name: "Kotlin",
        image: kotlinImg,
      },
    ],
  },
  {
    id: 3,
    title: "Backend & APIs",
    subSkills: [
      {
        name: "Node.js",
        image: nodeImg,
      },
      {
        name: "Python",
        image: pythonImg,
      },
      {
        name: "Java",
        image: javaImg,
      },
      {
        name: "WebSockets",
        image: websocketImg,
      },
    ],
  },
  {
    id: 4,
    title: "Databases & Caching",
    subSkills: [
      {
        name: "PostgreSQL/MySQL",
        image: postgresImg,
      },
      {
        name: "Redis",
        image: redisImg,
      },
      {
        name: "Query Optimization",
        image: sqlImg,
      },
    ],
  },
  {
    id: 5,
    title: "Security & Authentication",
    subSkills: [
      {
        name: "OAuth",
        image: authImg,
      },
      {
        name: "JWT/RBAC",
        image: jwtImg,
      },
      {
        name: "Secure API Design",
        image: apiImg,
      },
    ],
  },
  {
    id: 6,
    title: "Testing & Quality Assurance",
    subSkills: [
      {
        name: "Jest",
        image: jestImg,
      },
      {
        name: "Integration Testing",
        image: testingImg,
      },
      {
        name: "E2E Testing",
        image: e2eImg,
      },
    ],
  },
  {
    id: 7,
    title: "Cloud & DevOps",
    subSkills: [
      {
        name: "Cloudflare",
        image: cloudflareImg,
      },
      {
        name: "AWS",
        image: awsImg,
      },
      {
        name: "Docker",
        image: dockerImg,
      },
      {
        name: "Git",
        image: gitImg,
      },
      {
        name: "Linux",
        image: linuxImg,
      },
    ],
  },
  {
    id: 8,
    title: "Observability",
    subSkills: [
      {
        name: "CloudWatch",
        image: cloudwatchImg,
      },
      {
        name: "Structured Logging",
        image: logImg,
      },
      {
        name: "Incident Debugging",
        image: debugImg,
      },
    ],
  },
  {
    id: 9,
    title: "AI / Applied ML",
    subSkills: [
      {
        name: "Python",
        image: pythonImg,
      },
      {
        name: "TensorFlow",
        image: tensorflowImg,
      },
      {
        name: "PyTorch",
        image: pytorchImg,
      },
    ],
  },
];

export default skills;
