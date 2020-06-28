from invoke import task


@task(aliases=["f"])
def black(c):
    c.run("black .")


@task(aliases=["t"])
def test(c):
    c.run("coverage run -m pytest --junitxml=junit.xml")
    c.run("coverage xml")


@task(aliases=["l"])
def lint(c):
    c.run("pycodestyle --max-line-length=120 .")
