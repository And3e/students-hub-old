C="default message"

commit:
	git add .
	git commit -m $(C)
git:
	make commit
	git push