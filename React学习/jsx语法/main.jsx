let count = 1;
function getName(name) {
  return name;
}
const textColor = '绿色';
// jsx语法就是在js中插入xml标签
const h = (
  <div id="container">
    <h1>hello React!</h1>
    {/* jsx中嵌套表示式，{}可以放任何有效的javascript表达式 */}
    <h2>爸爸有{1 + 1}个好孩子</h2>
    <h2>我是好孩子{count++}号</h2>
    <h2>我是好孩子{count--}号</h2>
    <h3>
      {count++}号的名字是{getName('小熊熊')}
    </h3>
    <h3>
      {count}号的名字是{getName('小星星')}
    </h3>
    <h3>我们都喜欢{textColor}</h3>
  </div>
);

ReactDOM.render(h, document.querySelector('#root'));
