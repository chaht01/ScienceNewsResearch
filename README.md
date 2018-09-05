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
