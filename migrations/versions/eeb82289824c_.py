"""empty message

Revision ID: eeb82289824c
Revises: 2807edd385a2
Create Date: 2021-10-01 17:32:07.712465

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eeb82289824c'
down_revision = '2807edd385a2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('centro',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tipo', sa.String(length=20), nullable=False),
    sa.Column('peso', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('pareja',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('opcion', sa.Integer(), nullable=False),
    sa.Column('peso', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tiempo_proceso',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('menor_valor', sa.Integer(), nullable=False),
    sa.Column('mayor_valor', sa.Integer(), nullable=False),
    sa.Column('peso', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tratamiento',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tipo', sa.String(length=20), nullable=False),
    sa.Column('peso', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('user', sa.Column('name', sa.String(length=120), nullable=False))
    op.add_column('user', sa.Column('edad', sa.Integer(), nullable=False))
    op.add_column('user', sa.Column('num_aborto', sa.Integer(), nullable=False))
    op.add_column('user', sa.Column('pareja_id', sa.Integer(), nullable=False))
    op.add_column('user', sa.Column('tiempo_proceso_id', sa.Integer(), nullable=False))
    op.add_column('user', sa.Column('centro_id', sa.Integer(), nullable=False))
    op.add_column('user', sa.Column('tratamiento_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'user', 'tiempo_proceso', ['tiempo_proceso_id'], ['id'])
    op.create_foreign_key(None, 'user', 'pareja', ['pareja_id'], ['id'])
    op.create_foreign_key(None, 'user', 'centro', ['centro_id'], ['id'])
    op.create_foreign_key(None, 'user', 'tratamiento', ['tratamiento_id'], ['id'])
    op.drop_column('user', 'is_active')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'user', type_='foreignkey')
    op.drop_constraint(None, 'user', type_='foreignkey')
    op.drop_constraint(None, 'user', type_='foreignkey')
    op.drop_constraint(None, 'user', type_='foreignkey')
    op.drop_column('user', 'tratamiento_id')
    op.drop_column('user', 'centro_id')
    op.drop_column('user', 'tiempo_proceso_id')
    op.drop_column('user', 'pareja_id')
    op.drop_column('user', 'num_aborto')
    op.drop_column('user', 'edad')
    op.drop_column('user', 'name')
    op.drop_table('tratamiento')
    op.drop_table('tiempo_proceso')
    op.drop_table('pareja')
    op.drop_table('centro')
    # ### end Alembic commands ###
