# firestarter-cli

**cli boilerplate builder implemented in Typescript**

## install

```
$ npm install -g firestarter-cli
$ fire
```

## Operations

### ps (cpp)

template for problem-solving using cpp

## Flags

### ps (cpp)

- #### default:

  default template for `ps (cpp)` project

  ```cpp
  /*
  * Auto generated with firestarter-cli by @rudy3091
  * https://github.com/rudy3091/firestarter-cli
  */

  #include <iostream>
  using namespace std;

  void setup() {
  }

  void solve() {
  }

  int main() {
    cin.tie(nullptr);
  	ios_base::sync_with_stdio(false);

    setup();
    solve();

    return 0;
  }
  ```

- #### no global using namespace std

  does not generate `using namespace std;` line if this flag is set

- #### no setup func

  does not generate `setup` function if this flag is set

- #### no solve func

  does not generate `solve` function if this flag is set

- #### only main func

  generates only `main` function

  has same effect with setting both `no setup func` and `no solve func` flags on

- #### no fastio

  does not generate `cin.tie(nullptr); ios_base::sync_with_stdio(false);` for a fast input/output

- #### typedef coord

  adds `typedef pair<int, int> coord;` for a graph searching problem

- #### typedef edge

  adds `typedef tuple<int, int, int> edge;` for a graph searching problem

- #### typedef edge longlong

  adds `typedef tuple<int, int, longlong> edge;` for a graph searching problem

- #### add README.md

  adds `README.md` file in your project root directory
