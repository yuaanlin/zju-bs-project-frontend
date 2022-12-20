export default () => {
  return <footer
    className="fixed bottom-0 z-10 w-screen max-w-md bg-primary p-4
     text-xs text-white"
  >
    <div>
      <p>本网站是浙江大学计算机科学与技术学院</p>
      <p>2022 年秋冬学期《B/S体系软件设计》期末作业</p>
      <p>由 3190106167 林沅霖 开发</p>
    </div>
    <div className="mt-2 flex w-full justify-end">
      <a
        href="https://github.com/yuaanlin/zju-bs-project-frontend"
        target="_blank"
        rel="noreferrer"
        className="font-bold"
      >
        GitHub 代码仓库
      </a>
    </div>
  </footer>;
};
