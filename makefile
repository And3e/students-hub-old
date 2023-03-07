COM="upload automatico"

git:
	git add .
	git commit -m $(COM)
push:
	git push