"""empty message

Revision ID: 21d1fe0492e8
Revises: f9ef794e2c5a
Create Date: 2021-10-06 19:15:21.346552

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '21d1fe0492e8'
down_revision = 'f9ef794e2c5a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'password')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('password', sa.VARCHAR(length=80), autoincrement=False, nullable=False))
    # ### end Alembic commands ###
