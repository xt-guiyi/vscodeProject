import {
  Input,
  Button, 
  Message, 
  Container, 
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Header,
  Card,
  MessageBox,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  TableColumn,
  Tag,
  Select,
  Option,
  Dialog,
  Form,
  FormItem,
  Switch,
  RadioGroup,
  RadioButton,
  Divider,
  Popover,
  Upload,
  Radio,
  Pagination,
  Image,
  Link,
  Autocomplete,
  Avatar,
  Badge,
  Tabs,
  TabPane,
  Checkbox,
  CheckboxGroup,
  ButtonGroup,
  DatePicker
} from 'element-ui';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import Vue from 'vue'



Vue.prototype.$message = Message; 
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.component(CollapseTransition.name, CollapseTransition)
Vue
.use(Input)
.use(Button)
.use(Container)
.use(Aside)
.use(Main)
.use(Menu)
.use(Submenu)
.use(MenuItemGroup)
.use(MenuItem)
.use(Header)
.use(Card)
.use(Breadcrumb)
.use(BreadcrumbItem)
.use(Table)
.use(TableColumn)
.use(Tag)
.use(Select)
.use(Option)
.use(Dialog)
.use(Form)
.use(FormItem)
.use(Switch)
.use(RadioGroup)
.use(RadioButton)
.use(Divider)
.use(Popover)
.use(Upload)
.use(Radio)
.use(Pagination)
.use(Image)
.use(Link)
.use(Autocomplete)
.use(Avatar)
.use(Badge)
.use(Tabs)
.use(TabPane)
.use(Checkbox)
.use(CheckboxGroup)
.use(ButtonGroup)
.use(DatePicker)
  
