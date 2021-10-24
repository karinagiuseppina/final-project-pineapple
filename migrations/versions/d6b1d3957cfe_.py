"""empty message

Revision ID: d6b1d3957cfe
Revises: 6120f5ec08d5
Create Date: 2021-10-24 12:05:39.094222

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd6b1d3957cfe'
down_revision = '6120f5ec08d5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('message', sa.Column('conversation_id', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('message', 'conversation_id')
    # ### end Alembic commands ###
