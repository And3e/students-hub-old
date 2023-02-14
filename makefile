C="default commit"

commit:
	git add .
	git commit -m $(C)
git:
	make commit
	git push