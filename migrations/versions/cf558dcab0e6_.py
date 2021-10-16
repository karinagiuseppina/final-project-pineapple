"""empty message

Revision ID: cf558dcab0e6
Revises: 3d5095f52787
Create Date: 2021-10-16 12:38:36.281338

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'cf558dcab0e6'
down_revision = '3d5095f52787'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cloudinary_image',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('asset_id', sa.String(length=100), nullable=False),
    sa.Column('public_id', sa.String(length=100), nullable=False),
    sa.Column('version_id', sa.String(length=100), nullable=False),
    sa.Column('version', sa.String(length=100), nullable=False),
    sa.Column('secure_url', sa.String(length=150), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('asset_id')
    )
    op.add_column('user', sa.Column('cloudinary_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'user', 'cloudinary_image', ['cloudinary_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user', type_='foreignkey')
    op.drop_column('user', 'cloudinary_id')
    op.drop_table('cloudinary_image')
    # ### end Alembic commands ###
