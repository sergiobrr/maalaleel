# -*- coding: utf-8 -*-
import os
from app import create_app
from flask.ext.script import Manager, Shell, Server

app = create_app()
manager = Manager(app)
manager.add_command("runserver", Server(host="0.0.0.0", port=9010))


def make_shell_context():
    return dict(app=app)
manager.add_command('shell', Shell(make_context=make_shell_context))

if __name__ == '__main__':
    manager.run()