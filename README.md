# Collaborative Science News Research Project

Research Implementation about `Collaborative Science News Research` in KIXLAB 2018.

```
  yarn add
  yarn run start
```

> How to deploy?

After make some changes in your branch, (in case you test your code)

```
  git add .
  git commit -m "your commit message"
  git checkout master
  git merge <your branch name> --no-ff
  git push origin master

  yarn build
  scp -i <your/pem file path/name.pem> -r build ubuntu@ec2-13-209-74-251.ap-northeast-2.compute.amazonaws.com:/var/www/
```

You can download `name.pem` if you are authorized user of above server.

> How to change Tutorial?

Tutorial files are `/src/Components/Pages/Intro`, `/src/Components/Pages/QuestionerIntro`, and `/src/Components/Pages/AnswererIntro`.
In Those files, there is function named `recursive_listing` that automatically renders array of objects.

```
const recursive_listing = (depth, data) => {
      return (
        <ol type={listing[depth % 3]}>
          {data.map(item => {
            return (
              <React.Fragment>
                <li>
                  <span dangerouslySetInnerHTML={{ __html: item.text }} />
                  <br />
                  {item.image && <img src={item.image} />}
                </li>
                {item.children &&
                  item.children.length > 0 &&
                  recursive_listing(depth + 1, item.children)}
              </React.Fragment>
            );
          })}
        </ol>
      );
    };
```

Each object can have `text`, `children` and `image`. You can change your introduction text manually in each file and also import some images.
It's not clever way but you can place your all image files in `/src/static/` and import those files by `import ... from ...` syntax. For example,

```
import duringQ from "../../../static/duringQ.png";
```

Then you can use that image by define object like this

```
const instructions = [
  {
    text: "hello intorduction",
    image: duringQ,
    children: [
      {text: "children text"}
    ]
  }
]
```
