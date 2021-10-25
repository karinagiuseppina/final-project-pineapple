"""empty message

Revision ID: f61c2fc59f78
Revises: 
Create Date: 2021-10-24 18:45:35.707003

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f61c2fc59f78'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('center',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(length=20), nullable=False),
    sa.Column('weight', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('type')
    )
    op.create_table('chat',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('conversation',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('couple',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('option', sa.String(length=50), nullable=False),
    sa.Column('weight', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('option')
    )
    op.create_table('message',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('value', sa.String(length=250), nullable=False),
    sa.Column('pub_date', sa.DateTime(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('conversation_id', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('process',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('max_value', sa.Integer(), nullable=False),
    sa.Column('min_value', sa.Integer(), nullable=False),
    sa.Column('weight', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('treatment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(length=50), nullable=False),
    sa.Column('weight', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('type')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=250), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=True),
    sa.Column('profile_img', sa.String(length=250), nullable=True),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('abortion_num', sa.Integer(), nullable=True),
    sa.Column('couple_id', sa.Integer(), nullable=True),
    sa.Column('process_id', sa.Integer(), nullable=True),
    sa.Column('center_id', sa.Integer(), nullable=True),
    sa.Column('treatment_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['center_id'], ['center.id'], ),
    sa.ForeignKeyConstraint(['couple_id'], ['couple.id'], ),
    sa.ForeignKeyConstraint(['process_id'], ['process.id'], ),
    sa.ForeignKeyConstraint(['treatment_id'], ['treatment.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('chats',
    sa.Column('chat_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['chat_id'], ['chat.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('chat_id', 'user_id')
    )
    op.create_table('connections',
    sa.Column('user_connected', sa.Integer(), nullable=False),
    sa.Column('user_connecting', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_connected'], ['user.id'], ),
    sa.ForeignKeyConstraint(['user_connecting'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_connected', 'user_connecting')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('connections')
    op.drop_table('chats')
    op.drop_table('user')
    op.drop_table('treatment')
    op.drop_table('process')
    op.drop_table('message')
    op.drop_table('couple')
    op.drop_table('conversation')
    op.drop_table('chat')
    op.drop_table('center')
    # ### end Alembic commands ###
