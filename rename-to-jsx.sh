#for f in *.js; do mv -- "$f" "${f%.foo}.bar"; done
#for f in ./src/*.js; do echo $f; done
find ./src -type f -name '*.js' -print0 | while IFS= read -r -d '' f; do
  #mv -- "$f" "${f%.foo}.bar"
  echo "$f"
done