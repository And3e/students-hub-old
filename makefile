COM="default message"

commit:
	git add .
	git commit -m $(COM)
git:
	make commit
	git push